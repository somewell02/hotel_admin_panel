import { ref, onUnmounted } from "vue";
import { firestore } from "./firebase.js";

const usersCollection = firestore.collection("users");

export const getFilteredSortedPaginatedUsers = async (
  search,
  filters,
  sort,
  pagination
) => {
  const users = ref([]);
  let modifiedUsers = usersCollection;
  console.log(pagination);

  if (search) {
    modifiedUsers = modifiedUsers.where("email", "array-contains", search);
  }

  filters.forEach((filter) => {
    if (filter.values.length > 0) {
      switch (filter.type) {
        case "checkbox":
          modifiedUsers = modifiedUsers.where(filter.id, "in", filter.values);
          break;
      }
    }
  });

  if (sort.value != "default") {
    const value = sort.value.split(":")[0];
    const direction = sort.value.split(":")[1];
    modifiedUsers = modifiedUsers.orderBy(value, direction);
  }

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

export const getUsers3 = () => {
  const users = ref([]);

  const close = usersCollection.onSnapshot(async (snapshot) => {
    users.value = await snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(users);
  });
};

export const getUserById = async (id) => {
  const user = await usersCollection.doc(id).get();
  return user.exists ? user.data() : null;
};

export const addUser = async (
  firstName,
  lastName,
  patronumic,
  role,
  phone,
  email
) => {
  const user = {
    firstName: firstName,
    lastName: lastName,
    patronumic: patronumic,
    role: role,
    phone: phone,
    email: email,
  };
  await usersCollection.add(user);
};

export const updateUser = async (
  id,
  first_name,
  last_name,
  patronumic,
  role,
  phone,
  email
) => {
  await usersCollection.doc(id).update({
    firstName: first_name,
    lastName: last_name,
    patronumic: patronumic,
    role: role,
    phone: phone,
    email: email,
  });
};

export const deleteUser = (id) => {
  return usersCollection.doc(id).delete();
};

/*this.usersList = [
          {
            email: "nikitka32171@gmail.com",
            id: "WNl3pjYmZhg5l4HpCJCvPJdzq723",
            isNotifications: true,
            name: "Никита МихайлоvA",
            phone: null,
            photoUrl: null,
            role: "guest",
            uid: "WNl3pjYmZhg5l4HpCJCvPJdzq723",
          },
          {
            email: "qwe",
            id: "blZLihSea0cXbFAet9x7ehnZgf63",
            isNotifications: false,
            name: "qweqwe",
            phone: "+71111111111",
            photoUrl: null,
            uid: "blZLihSea0cXbFAet9x7ehnZgf63",
          },
          {
            email: "123123fff",
            firstName: "Михаил",
            id: "xtFyuvqvScZ04TFbW4b9FkMmfVS2",
            isNotifications: true,
            lastName: "Машканцев",
            name: "Никита Михайловdzzdyg",
            patronumic: "Максимович",
            phone: "+79111742312",
            photoUrl:
              "https://lh3.googleusercontent.com/a/AATXAJzEryE0Xz_nyoTLRvO9uIrCvRNSOaz1LxaDtCGO=s96-c",
            role: "Портье",
            uid: "xtFyuvqvScZ04TFbW4b9FkMmfVS2",
          },
        ];*/
