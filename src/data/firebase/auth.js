import { firebaseApp, auth } from "./firebase.js";
import "firebase/compat/auth";
import store from "@/data/store/vuex";
import router from "@/router/router.js";
import { getUserById } from "./usersApi";
import { getUserRoleById } from "./userRolesApi.js";

export const getAuthUser = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      isStaff(user.uid)
        .then((staff) => {
          if (staff) {
            getUserById(user.uid).then((data) => {
              store.commit("user/setUser", data);
            });
            router.push({ name: "main" });
          } else {
            logout();
            router.push({
              name: "authorization",
            });
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (router.currentRoute.value.name != "authorization") {
      router.push({ name: "authorization" });
    }
  });
};

export const getAuth = async (email, password) => {
  const res = await firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      const access = isStaff(data.user.uid)
        .then((staff) => {
          if (staff) {
            return "access";
          } else {
            return "no-access";
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
      return access;
    })
    .catch((error) => {
      return error.code;
    });
  return res;
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
    if (role) return role.staff;
    else return false;
  } else return false;
};
