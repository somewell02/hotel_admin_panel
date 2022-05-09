import { firebaseApp, auth } from "./firebase.js";
import "firebase/compat/auth";

auth.onAuthStateChanged((user) => {
  if (user) {
    user.getIdTokenResult().then((idTokenResult) => {
      console.log(idTokenResult.claims);
    });
  }
});

export const getAuth = async (email, password) => {
  const user = await firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (user) {
      console.log(user);
      console.log(user.claims);
      return true;
    })
    .catch(function (error) {
      console.log(error.message);
      return false;
    });
  return user;
};
