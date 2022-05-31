import { ref, onUnmounted } from "vue";
import { firestore } from "./firebase.js";
import { addImageInStorage } from "./firestorage";

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

export const getRoomsByTag = async (tagId) => {
  const res = await roomsCollection
    .where("tags", "array-contains", tagId)
    .get();
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

//import { firebaseApp } from "./firebase";
//import { getStorage, ref as stRef, getBytes } from "firebase/storage";

export const getModifiedRoomById = async (id) => {
  const res = await roomsCollection.doc(id).get();

  // const storage = getStorage(firebaseApp);
  // const forestRef = stRef(storage, "img/rooms/8/photo1.jpg");

  // getBytes(forestRef).then((metadata) => {
  //   console.log(metadata);
  // });

  return res.exists ? res.data() : null;
};

export const addRoom = async (room) => {
  const images = [...room.images];
  room.images = [];
  const res = await roomsCollection.add(room);
  const urls = await setGallery(res.id, images);
  await roomsCollection.doc(res.id).update({
    images: urls,
  });
  return res ?? null;
};

export const updateRoom = async (id, room) => {
  //setGallery(id, room.images);
  const res = await roomsCollection.doc(id).update(room);

  if (res) return true;
  else return false;
};

export const deleteRoom = (id) => {
  const res = roomsCollection.doc(id).delete();
  if (res) return res;
};

export const setGallery = async (id, images) => {
  let urls = [];

  for (let i = 0; i < images.length; i++) {
    await addImageInStorage(
      images[i],
      "photo" + (i + 1),
      "img/rooms/" + id + "/"
    ).then((url) => {
      urls.push(url);
    });
  }

  return urls;
};
