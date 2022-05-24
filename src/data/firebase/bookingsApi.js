import { ref, onUnmounted } from "vue";
import { firestore } from "./firebase.js";

const bookingsCollection = firestore.collection("bookings");

export const getBookings = () => {
  const bookings = ref([]);

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

export const getBookingsByStatus = async (statusId) => {
  const res = await bookingsCollection.where("status", "==", statusId).get();
  const bookings = res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return bookings;
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
  if (res) return true;
  else return false;
};

export const deleteBooking = (id) => {
  const res = bookingsCollection.doc(id).delete();
  if (res) return res;
};
