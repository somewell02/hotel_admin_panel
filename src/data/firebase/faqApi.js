import { ref, onUnmounted } from "vue";
import { firestore } from "./firebase.js";
import { addImageInStorage, deleteFile } from "./firestorage";

const faqCollection = firestore.collection("FAQ");

export const getFaq = async () => {
  const res = await faqCollection.get();
  const faq = res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return faq;
};

export const subscribeFaq = async () => {
  const faq = ref(null);

  const close = faqCollection.onSnapshot((snapshot) => {
    faq.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(faq);
  });
};

export const getFaqById = async (id) => {
  const res = await faqCollection.doc(id).get();
  return res.exists ? { id: res.id, ...res.data() } : null;
};

export const addFaq = async (faq) => {
  const img = faq.image;
  faq.image = "";
  faq.date = new Date(Date.now());
  const res = await faqCollection.add(faq);
  const url = await setFaqImage(res.id, img);
  if (url) {
    faqCollection.doc(res.id).update({
      image: url,
    });
  }
  return res ?? null;
};

export const updateFaq = async (id, faq) => {
  const img = faq.image;
  faq.image = await setFaqImage(id, img);
  const res = await faqCollection.doc(id).update(faq);
  return res ?? null;
};

export const deleteFaq = (faq) => {
  const res = faqCollection.doc(faq.id).delete();
  if (res) {
    const path = faq.image.split("/");
    const params = path[path.length - 1].split("?")[0].split("%2F");
    const img = params[params.length - 1];
    deleteFile("img/hotel/faq/" + img);
  }
  return res ?? null;
};

const setFaqImage = async (id, img) => {
  const url = await addImageInStorage(img, id, "img/hotel/faq/");
  return url;
};
