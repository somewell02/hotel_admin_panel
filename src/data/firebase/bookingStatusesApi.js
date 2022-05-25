import { ref, onUnmounted } from "vue";
import { firestore } from "./firebase.js";

const statusesCollection = firestore.collection("bookingStatuses");

export const getBookingStatuses = async () => {
  const res = await statusesCollection.get();
  const statuses = res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return statuses;
};

export const subscribeBookingStatuses = async () => {
  const statuses = ref(null);

  const close = statusesCollection.onSnapshot((snapshot) => {
    statuses.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(statuses);
  });
};

export const getBookingStatusById = async (id) => {
  const res = await statusesCollection.doc(id).get();
  return res.exists ? { id: res.id, ...res.data() } : null;
};

export const addBookingStatus = async (status) => {
  const data = { ...status };
  delete data.id;
  const res = await statusesCollection.doc(status.id).set(status);
  return res ?? null;
};

export const updateBookingStatus = async (status) => {
  const data = { ...status };
  delete data.id;
  const res = await statusesCollection.doc(status.id).update(data);
  return res ?? null;
};

export const deleteBookingStatus = (id) => {
  const res = statusesCollection.doc(id).delete();
  return res ?? null;
};
