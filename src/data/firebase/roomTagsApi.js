import firebase from "firebase/compat/app";
import { ref, onUnmounted } from "vue";
import { firestore } from "./firebase.js";

const tagsCollection = firestore.collection("roomTags");

export const getTagsByRoom = async (tags) => {
  const res = await tagsCollection
    .where(firebase.firestore.FieldPath.documentId(), "in", tags)
    .get();

  const data = res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

export const getRoomTags = async () => {
  const res = await tagsCollection.get();
  const tags = res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return tags;
};

export const subscribeRoomTags = async () => {
  const tags = ref(null);

  const close = tagsCollection.onSnapshot((snapshot) => {
    tags.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(tags);
  });
};

export const getRoomTagById = async (id) => {
  const res = await tagsCollection.doc(id).get();
  return res.exists ? { id: res.id, ...res.data() } : null;
};

export const addRoomTag = async (tag) => {
  const res = await tagsCollection.add(tag);
  return res ?? null;
};

export const updateRoomTag = async (id, tag) => {
  const res = await tagsCollection.doc(id).update(tag);
  return res ?? null;
};

export const deleteRoomTag = (id) => {
  const res = tagsCollection.doc(id).delete();
  return res ?? null;
};
