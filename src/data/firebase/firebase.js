import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { config } from "./firebase-config";

export const firebaseApp = firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebaseApp.firestore();
