import { auth, firebaseApp } from "./firebase.js";
import "firebase/compat/auth";
import store from "@/data/store/vuex";
import router from "@/router/router.js";
import { getUserById } from "./usersApi";
import { getUserRoleById } from "./userRolesApi.js";

export const getAuthUser = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      isStaff(user.uid)
        .then((role) => {
          if (role.staff) {
            getUserById(user.uid).then((data) => {
              data.role = role;
              store.commit("user/setUser", data);
            });
            if (router.currentRoute.value.name === "authorization") {
              router.push({ name: "main" });
            }
          } else {
            logout();
            router.push({ name: "authorization" });
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (router.currentRoute.value.name !== "authorization") {
      router.push({ name: "authorization" });
    }
  });
};

export const getAuth = async (email, password) => {
  return await firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      return isStaff(data.user.uid)
        .then((role) => {
          if (role.staff) {
            return "access";
          } else {
            return "no-access";
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    })
    .catch((error) => {
      return error.code;
    });
};

export const logout = () => {
  firebaseApp
    .auth()
    .signOut()
    .then(function () {
      store.commit("user/setUser", null);
    })
    .catch(function (error) {
      console.log(error.message);
    });
};

export const isStaff = async (uid) => {
  const user = await getUserById(uid);
  if (user) {
    const role = await getUserRoleById(user.role);
    if (role) return role;
    else return false;
  } else return false;
};
