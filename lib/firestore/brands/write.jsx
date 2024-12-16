import { db } from "@/lib/firebase"; // Import your Firebase config
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

/**
 * Create a New Brand
 * @param {Object} data - Data for the new brand (requires 'name')
 */
export const createNewBrand = async ({ data }) => {
  if (!data?.name) {
    throw new Error("Name is required");
  }

  const newId = doc(collection(db, `ids`)).id; // Generate a new ID

  await setDoc(doc(db, `brands/${newId}`), {
    ...data,
    id: newId,
  });
};

/**
 * Update an Existing Brand
 * @param {Object} data - Data for updating a brand (requires 'id' and 'name')
 */
export const updateBrand = async ({ data }) => {
  if (!data?.name) {
    throw new Error("Name is required");
  }
  if (!data?.id) {
    throw new Error("ID is required");
  }

  const id = data.id;

  await updateDoc(doc(db, `brands/${id}`), {
    ...data,
  });
};

export const deleteBrand = async ({ id }) => {
  if (!id) {
    throw new Error("ID is required");
  }

  await deleteDoc(doc(db, `brands/${id}`));
};
