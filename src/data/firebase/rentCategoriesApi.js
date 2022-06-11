import { ref, onUnmounted } from "vue";
import { firestore } from "./firebase.js";

const rentCategoriesCollection = firestore.collection("rentCategory");

export const getAllRentCategories = async () => {
  const pRes = await rentCategoriesCollection.get();
  const parents = pRes.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  let categories = ref([]);
  parents.forEach(async (parent) => {
    const cRes = await rentCategoriesCollection
      .doc(parent.id)
      .collection("children")
      .get();
    const items = cRes.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    categories.value.push(...items);
  });
  return categories;
};

export const subscribeRentCategories = async () => {
  const categories = ref(null);

  const close = rentCategoriesCollection.onSnapshot((snapshot) => {
    categories.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(categories);
  });
};

export const getRentCategoryById = async (id) => {
  const res = await rentCategoriesCollection.doc(id).get();
  return res.exists ? { id: res.id, ...res.data() } : null;
};

export const addRentCategory = async (category) => {
  const data = { ...category };
  delete data.id;
  const res = await rentCategoriesCollection.doc(category.id).set(category);
  return res ?? null;
};

export const updateRentCategory = async (category) => {
  const data = { ...category };
  delete data.id;
  const res = await rentCategoriesCollection.doc(category.id).update(data);
  return res ?? null;
};

export const deleteRentCategory = (id) => {
  const res = rentCategoriesCollection.doc(id).delete();
  return res ?? null;
};
