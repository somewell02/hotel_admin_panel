import { ref, onUnmounted } from "vue";
import { firestore } from "./firebase.js";

const typesCollection = firestore.collection("roomTypes");

export const getRoomTypes = async () => {
  const res = await typesCollection.get();
  const types = res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return types;
};

export const subscribeRoomTypes = async () => {
  const types = ref([]);

  const close = typesCollection.onSnapshot((snapshot) => {
    types.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(types);
  });
};

export const getRoomTypeById = async (id) => {
  const res = await typesCollection.doc(id).get();
  return res.exists ? { id: res.id, ...res.data() } : null;
};

export const addRoomType = async (type) => {
  const data = { ...type };
  delete data.id;
  const res = await typesCollection.doc(type.id).set(type);
  return res ?? null;
};

export const updateRoomType = async (type) => {
  const data = { ...type };
  delete data.id;
  const res = await typesCollection.doc(type.id).update(data);
  return res ?? null;
};

export const deleteRoomType = (id) => {
  const res = typesCollection.doc(id).delete();
  return res ?? null;
};
