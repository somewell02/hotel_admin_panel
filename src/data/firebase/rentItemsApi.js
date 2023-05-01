import { onUnmounted, ref } from "vue";
import { firestore } from "./firebase.js";
import { addImageInStorage } from "./firestorage";

const rentItemsCollection = firestore.collection("rent");

export const getRentItems = async () => {
  const res = await rentItemsCollection.get();
  return res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const subscribeRentItems = () => {
  const rentItems = ref(null);

  const close = rentItemsCollection.onSnapshot((snapshot) => {
    rentItems.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(rentItems);
  });
};

export const getRentItemsByCategory = async (categoryId) => {
  const res = await rentItemsCollection
    .where("category", "==", categoryId)
    .get();
  return res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addRentItem = async (rent) => {
  const images = [...rent.images];
  rent.images = [];
  const res = await rentItemsCollection.add(rent);
  if (res) {
    const urls = await setGallery(res.id, images);
    await rentItemsCollection.doc(res.id).update({
      images: urls,
    });
    return res;
  } else {
    return null;
  }
};

export const updateRentItem = async (id, rent) => {
  const res = await rentItemsCollection.doc(id).update(rent);
  return res ?? null;
};

export const deleteRentItem = (id) => {
  const res = rentItemsCollection.doc(id).delete();
  return res ?? null;
};

export const setGallery = async (id, images) => {
  let urls = [];

  for (let i = 0; i < images.length; i++) {
    await addImageInStorage(
      images[i],
      "photo" + (i + 1),
      "img/rent/" + id + "/"
    ).then((url) => {
      urls.push(url);
    });
  }

  return urls;
};
