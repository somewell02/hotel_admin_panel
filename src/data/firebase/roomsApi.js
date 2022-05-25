import { ref, onUnmounted } from "vue";
import { firestore } from "./firebase.js";

const roomsCollection = firestore.collection("rooms");

export const getRooms = () => {
  const rooms = ref(null);

  const close = roomsCollection.onSnapshot((snapshot) => {
    rooms.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(rooms);
  });
};

export const getRoomsByType = async (typeId) => {
  const res = await roomsCollection.where("type", "==", typeId).get();
  const rooms = res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return rooms;
};

export const getRoomById = async (id) => {
  const res = await roomsCollection.doc(id).get();
  return res.exists ? res.data() : null;
};

export const addRoom = async (room) => {
  const res = await roomsCollection.add(room);
  return res ?? null;
};

export const updateRoom = async (id, room) => {
  const res = await roomsCollection.doc(id).update(room);

  if (res) return true;
  else return false;
};

export const deleteRoom = (id) => {
  const res = roomsCollection.doc(id).delete();
  if (res) return res;
};
