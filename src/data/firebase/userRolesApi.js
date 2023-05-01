import { onUnmounted, ref } from "vue";
import { firestore } from "./firebase.js";

const rolesCollection = firestore.collection("userRoles");

export const getUserRoles = async () => {
  const res = await rolesCollection.get();
  return res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const subscribeUserRoles = async () => {
  const roles = ref(null);

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

export const getUserRoleById = async (id) => {
  const res = await rolesCollection.doc(id).get();
  return res.exists ? { id: res.id, ...res.data() } : null;
};

export const addUserRole = async (role) => {
  const data = { ...role };
  delete data.id;
  const res = await rolesCollection.doc(role.id).set(role);
  return res ?? null;
};

export const updateUserRole = async (role) => {
  const data = { ...role };
  delete data.id;
  const res = await rolesCollection.doc(role.id).update(data);
  return res ?? null;
};

export const deleteUserRole = (id) => {
  const res = rolesCollection.doc(id).delete();
  return res ?? null;
};
