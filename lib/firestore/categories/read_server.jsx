import { db } from "@/lib/firebase"; // Ensure you're importing your firebase instance
import { collection, doc, getDoc, getDocs ,Timestamp} from "firebase/firestore"; // Import Firestore methods

// Function to convert Firebase Timestamp to a plain value (ISO string)
const convertTimestamp = (timestamp) => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toISOString(); // Convert to ISO string
  }
  return null; // If not a valid Timestamp, return null
};

export const getCategory = async ({ id }) => {
  const data = await getDoc(doc(db, `categories/${id}`));
  if (data.exists()) {
    const categoryData = data.data();

    // Convert Firestore Timestamps to ISO string or Date
    if (categoryData.timestampCreate) {
      categoryData.timestampCreate = convertTimestamp(categoryData.timestampCreate);
    }
    if (categoryData.timestampUpdate) {
      categoryData.timestampUpdate = convertTimestamp(categoryData.timestampUpdate);
    }

    return categoryData; // Return serialized data
  } else {
    return null;
  }
};

export const getCategories = async () => {
  const list = await getDocs(collection(db, "categories"));
  return list.docs.map((snap) => {
    const categoryData = snap.data();

    // Convert Firestore Timestamps to ISO string or Date
    if (categoryData.timestampCreate) {
      categoryData.timestampCreate = convertTimestamp(categoryData.timestampCreate);
    }
    if (categoryData.timestampUpdate) {
      categoryData.timestampUpdate = convertTimestamp(categoryData.timestampUpdate);
    }

    return categoryData; // Return serialized data
  });
};
