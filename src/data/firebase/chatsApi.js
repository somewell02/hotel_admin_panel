import { ref, onUnmounted } from "vue";
import firebase from "firebase/compat/app";
import { firestore } from "./firebase";
import { getUserById } from "./usersApi.js";

const chatsCollection = firestore.collection("chats");

export const getChats = () => {
  const chats = ref(null);

  const close = chatsCollection
    .orderBy("recentMessage.sendAt", "desc")
    .onSnapshot((snapshot) => {
      chats.value = snapshot.docs.map((doc) => {
        let user = null;
        getUserById(doc.data().uid).then((res) => {
          user = res;
        });

        return {
          id: doc.id,
          user: user,
          ...doc.data(),
        };
      });
    });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(chats);
  });
};

export const getChatById = async (id) => {
  const chat = await chatsCollection.doc(id).get();
  return chat.exists ? chat.data() : null;
};

export const addChat = (id, chat) => {
  const res = chatsCollection.doc(id).set(chat);
  return res ?? null;
};

export const deleteChat = async (id) => {
  const messagesCollection = chatsCollection.doc(id).collection("messages");

  const snapshot = await messagesCollection.get();
  snapshot.docs.forEach((message) => {
    messagesCollection.doc(message.ref.id).delete();
  });

  return chatsCollection.doc(id).delete();
};

export const setProcessingStatus = (chatId, id) => {
  chatsCollection.doc(chatId).update({
    status: "processing",
    userIds: firebase.firestore.FieldValue.arrayUnion(id),
  });
};

export const setDefaultStatus = (chatId) => {
  chatsCollection.doc(chatId).update({
    status: "default",
    userIds: [chatId],
  });
};

export const joinChat = (chatId, id) => {
  chatsCollection.doc(chatId).update({
    userIds: firebase.firestore.FieldValue.arrayUnion(id),
  });
};

export const getChatMessages = (id) => {
  const chatMessages = ref(null);

  const close = chatsCollection
    .doc(id)
    .collection("messages")
    .orderBy("sendAt", "asc")
    .onSnapshot((snapshot) => {
      chatMessages.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(chatMessages);
  });
};

export const sendMessage = async (id, message) => {
  const res = await chatsCollection.doc(id).collection("messages").add(message);
  await chatsCollection.doc(id).update({
    recentMessage: message,
  });
  return res ?? null;
};
