import { onUnmounted, ref } from "vue";
import { firestore } from "./firebase.js";
import { addImageInStorage, deleteFile } from "./firestorage";

const eventsCollection = firestore.collection("events");

export const getEvents = async () => {
  const res = await eventsCollection.get();
  return res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const subscribeEvents = async () => {
  const events = ref(null);

  const close = eventsCollection.onSnapshot((snapshot) => {
    events.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(events);
  });
};

export const getEventById = async (id) => {
  const res = await eventsCollection.doc(id).get();
  return res.exists ? { id: res.id, ...res.data() } : null;
};

export const addEvent = async (event) => {
  const img = event.image;
  event.image = "";
  const res = await eventsCollection.add(event);
  const url = await setEventImage(res.id, img);
  if (url) {
    await eventsCollection.doc(res.id).update({
      image: url,
    });
  }
  return res ?? null;
};

export const updateEvent = async (id, event) => {
  const img = event.image;
  event.image = await setEventImage(id, img);
  const res = await eventsCollection.doc(id).update(event);
  return res ?? null;
};

export const deleteEvent = (event) => {
  const res = eventsCollection.doc(event.id).delete();
  if (res) {
    const path = event.image.split("/");
    const params = path[path.length - 1].split("?")[0].split("%2F");
    const img = params[params.length - 1];
    deleteFile("img/events/" + img);
  }
  return res ?? null;
};

const setEventImage = async (id, img) => {
  return await addImageInStorage(img, id, "img/events/");
};
