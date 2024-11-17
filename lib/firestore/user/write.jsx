import { db } from "@/lib/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export const createUser = async ({ uid, displayName, photoURL }) => {
  await setDoc(
    doc(db, `users/${uid}`),
    {
      displayName: displayName,
      photoURL: photoURL ?? "",
      timestampCreate: Timestamp.now(),
    },
    { merge: true }
  );
};

export const updateFavorites = async ({ uid, list }) => {
  // Ensure list is never undefined by providing a fallback to an empty array if it's undefined
  const favoritesList = list ?? [];  // Default to an empty array if list is undefined

  await setDoc(
    doc(db, `users/${uid}`),
    {
      favorites: favoritesList,
    },
    {
      merge: true,
    }
  );
};


export const updateCarts = async ({ uid, list }) => {
  await setDoc(
    doc(db, `users/${uid}`),
    {
      carts: list,
    },
    {
      merge: true,
    }
  );
};