import { ref, onUnmounted } from "vue";
import { firestore } from "./firebase.js";
import { addChat, deleteChat } from "./chatsApi";

const usersCollection = firestore.collection("users");

export const getUsers = () => {
  const users = ref([]);
  let modifiedUsers = usersCollection;

  // filters.forEach((filter) => {
  //   if (filter.values.length > 0) {
  //     switch (filter.type) {
  //       case "checkbox":
  //         modifiedUsers = modifiedUsers.where(filter.id, "in", filter.values);
  //         break;
  //     }
  //   }
  // });

  // if (sort.value != "default") {
  //   const value = sort.value.split(":")[0];
  //   const direction = sort.value.split(":")[1];
  //   modifiedUsers = modifiedUsers.orderBy(value, direction);
  // }

  // let length;
  // await modifiedUsers.get().then((snap) => {
  //   length = snap;
  // });
  // console.log(length);

  const close = modifiedUsers.onSnapshot((snapshot) => {
    users.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(users);
  });
};

export const getUsers2 = async () => {
  let users = ref([]);

  await usersCollection.get().then(function (snapshot) {
    users.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });

  return users;
};

export const getUsersByRole = async (roleId) => {
  const res = await usersCollection.where("role", "==", roleId).get();
  const users = res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return users;
};

export const getUserById = async (id) => {
  const res = await usersCollection.doc(id).get();
  if (res.exists) {
    return {
      id: id,
      ...res.data(),
    };
  } else return null;
};

export const addUser = async (user) => {
  const res = await usersCollection.add(user);
  await addChat(res.id, {
    name: user.name,
    recentMessage: {
      sendAt: Date.now(),
    },
    status: "default",
    uid: res.id,
    userIds: [res.id],
  });
  return res ?? null;
};

export const updateUser = async (id, user) => {
  const res = await usersCollection.doc(id).update(user);

  if (res) return true;
  else return false;
};

export const deleteUser = (id) => {
  const res = usersCollection.doc(id).delete();
  deleteChat(id);
  if (res) return res;
};
