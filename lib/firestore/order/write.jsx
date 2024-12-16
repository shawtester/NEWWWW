import { db } from '@/lib/firebase'; // Firebase initialization (make sure you have this setup)
import { addDoc ,collection} from 'firebase/firestore';


export async function writeToFirestore(data) {
  try {
    const docRef = await addDoc(collection(db, 'orders'), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // return the document ID for further use (if needed)
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}
