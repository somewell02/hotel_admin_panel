import { ref, onUnmounted } from "vue";
import { firestore } from "./firebase.js";

const usersCollection = firestore.collection("users");
const rolesCollection = firestore.collection("userRoles");

export const getUserRoles = async () => {
  const res = await rolesCollection.get();
  const users = res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return users;
};

export const getUsers = () => {
  const users = ref([]);
  let modifiedUsers = usersCollection;

  // filters.forEach((filter) => {
  //   if (filter.values.length > 0) {
  //     switch (filter.type) {
  //       case "checkbox":
  //         modifiedUsers = modifiedUsers.where(filter.id, "in", filter.values);
  //         break;
  //     }
  //   }
  // });

  // if (sort.value != "default") {
  //   const value = sort.value.split(":")[0];
  //   const direction = sort.value.split(":")[1];
  //   modifiedUsers = modifiedUsers.orderBy(value, direction);
  // }

  // let length;
  // await modifiedUsers.get().then((snap) => {
  //   length = snap;
  // });
  // console.log(length);

  const close = modifiedUsers.onSnapshot((snapshot) => {
    users.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(users);
  });
};

export const getUsers2 = async () => {
  let users = ref([]);

  await usersCollection.get().then(function (snapshot) {
    users.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });

  return users;
};

export const getUserById = async (id) => {
  const res = await usersCollection.doc(id).get();
  return res.exists ? res.data() : null;
};

export const addUser = async (user) => {
  const res = await usersCollection.add(user);
  return res ?? null;
};

export const updateUser = async (id, user) => {
  const res = await usersCollection.doc(id).update(user);

  if (res) return true;
  else return false;
};

export const deleteUser = (id) => {
  const res = usersCollection.doc(id).delete();
  if (res) return res;
};
