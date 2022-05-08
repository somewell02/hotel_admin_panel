import { firebaseApp } from "./firebase.js";
import "firebase/compat/auth";

export const getAuth = async (email, password) => {
  const user = await firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (user) {
      console.log(user);
      return true;
    })
    .catch(function (error) {
      console.log(error.message);
      return false;
    });
  return user;
};
