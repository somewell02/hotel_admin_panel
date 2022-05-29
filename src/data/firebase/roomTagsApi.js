import firebase from "firebase/compat/app";
//import { ref, onUnmounted } from "vue";
import { firestore } from "./firebase.js";

const tagsCollection = firestore.collection("roomTags");

export const getTagsByRoom = async (tags) => {
  const res = await tagsCollection
    .where(firebase.firestore.FieldPath.documentId(), "in", tags)
    .get();

  const data = res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

export const getRoomTags = async () => {
  const res = await tagsCollection.get();
  const tags = res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return tags;
};
