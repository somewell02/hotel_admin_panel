import { onUnmounted, ref } from "vue";
import { firestore } from "./firebase.js";

const bookingsCollection = firestore.collection("bookings");

export const getBookings = () => {
  const bookings = ref(null);

  const close = bookingsCollection.onSnapshot((snapshot) => {
    bookings.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(bookings);
  });
};

export const getBookingsByUser = (id) => {
  const bookings = ref(null);

  const close = bookingsCollection
    .where("uid", "==", id)
    .onSnapshot((snapshot) => {
      bookings.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(bookings);
  });
};

export const getBookingsByRoom = (id) => {
  const bookings = ref(null);

  const close = bookingsCollection
    .where("roomId", "==", id)
    .onSnapshot((snapshot) => {
      bookings.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(bookings);
  });
};

export const getBookingsByStatus = async (statusId) => {
  const res = await bookingsCollection.where("status", "==", statusId).get();
  return res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getBookingById = async (id) => {
  const res = await bookingsCollection.doc(id).get();
  if (res.exists) {
    return {
      id: id,
      ...res.data(),
    };
  } else return null;
};

export const addBooking = async (booking) => {
  const res = await bookingsCollection.add(booking);
  return res ?? null;
};

export const updateBooking = async (id, booking) => {
  const res = await bookingsCollection.doc(id).update(booking);
  return res ?? null;
};

export const deleteBooking = (id) => {
  const res = bookingsCollection.doc(id).delete();
  return res ?? null;
};
