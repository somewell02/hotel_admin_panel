import { onUnmounted, ref } from "vue";
import { firestore } from "./firebase.js";

const bookingsCollection = firestore.collection("bookings");

export const getBookingRents = async (bookingId) => {
  const res = await bookingsCollection.doc(bookingId).collection("rents").get();
  return res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const subscribeBookingRents = (bookingId) => {
  const rents = ref(null);

  const close = bookingsCollection
    .doc(bookingId)
    .collection("rents")
    .onSnapshot((snapshot) => {
      rents.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(rents);
  });
};

export const getBookingRentById = async (bookingId, id) => {
  const res = await bookingsCollection
    .doc(bookingId)
    .collection("rents")
    .doc(id)
    .get();
  if (res.exists) {
    return {
      id: id,
      ...res.data(),
    };
  } else return null;
};

export const addBookingRent = async (bookingId, rent) => {
  const res = await bookingsCollection
    .doc(bookingId)
    .collection("rents")
    .add(rent);
  return res ?? null;
};

export const updateBookingRent = async (bookingId, id, rent) => {
  const res = await bookingsCollection
    .doc(bookingId)
    .collection("rents")
    .doc(id)
    .update(rent);
  return res ?? null;
};

export const deleteBookingRent = (bookingId, id) => {
  const res = bookingsCollection
    .doc(bookingId)
    .collection("rents")
    .doc(id)
    .delete();
  return res ?? null;
};
