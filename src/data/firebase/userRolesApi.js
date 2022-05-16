import { ref, onUnmounted } from "vue";
import { firestore } from "./firebase.js";

const rolesCollection = firestore.collection("userRoles");

export const getUserRoles = async () => {
  const res = await rolesCollection.get();
  const users = res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return users;
};

export const subscribeUserRoles = async () => {
  const roles = ref([]);

  const close = rolesCollection.onSnapshot((snapshot) => {
    roles.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(roles);
  });
};
