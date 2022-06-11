import { ref, onUnmounted } from "vue";
import { firestore } from "./firebase.js";

const typesCollection = firestore.collection("eventTypes");

export const getEventTypes = async () => {
  const res = await typesCollection.get();
  const types = res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return types;
};

export const subscribeEventTypes = async () => {
  const types = ref(null);

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

export const getEventTypeById = async (id) => {
  const res = await typesCollection.doc(id).get();
  return res.exists ? { id: res.id, ...res.data() } : null;
};

export const addEventType = async (type) => {
  const data = { ...type };
  delete data.id;
  const res = await typesCollection.doc(type.id).set(type);
  return res ?? null;
};

export const updateEventType = async (type) => {
  const data = { ...type };
  delete data.id;
  const res = await typesCollection.doc(type.id).update(data);
  return res ?? null;
};

export const deleteEventType = (id) => {
  const res = typesCollection.doc(id).delete();
  return res ?? null;
};
