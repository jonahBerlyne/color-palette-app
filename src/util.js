import db from "./firebase";
import { 
    collection, 
    addDoc, 
    updateDoc, 
    doc, 
    deleteDoc, 
    query, 
    where, 
    getDocs, 
    serverTimestamp
} from "firebase/firestore";  
  
export const handleNew = async () => {
    // const docRef = doc(db, "colors", "color001");
    // const payload = {name: "Black", value: "#000"};
    // // setDoc adds a new document to the collection in the cloud firestore, it can be used to override data with the same document id
    // await setDoc(docRef, payload);
    // addDoc tells firestore to auto-id instead of having to manually code the id
    const name = prompt("Enter a color:");
    const value = prompt("Enter the color's value:");
    const collectionRef = collection(db, "colors");
    const payload = { name, value, timestamp: serverTimestamp() };
    const docRef = await addDoc(collectionRef, payload);
    console.log(`New id is: ${docRef.id}`);
}

export const handleEdit = async (id) => {
 const docRef = doc(db, "colors", id);
 const name = prompt("Enter a color:");
 const value = prompt("Enter the color's value:");
 const payload = { name, value, timestamp: serverTimestamp() };
 updateDoc(docRef, payload);
}

export const handleDelete = async (id) => {
  const docRef = doc(db, "colors", id);
  await deleteDoc(docRef);
}

export const handleQueryDelete = async (id) => {
  const userInputName = prompt("Enter a color:");
  const collectionRef = collection(db, "colors");
  const q = query(collectionRef, where("name", "==", userInputName));
 
  const snapshot = await getDocs(q);
  const results = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));

  results.forEach(async result => {
      const docRef = doc(db, "colors", result.id);
      await deleteDoc(docRef);
  });
}