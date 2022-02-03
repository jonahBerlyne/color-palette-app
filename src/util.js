import db from "./firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";  
  
export const handleNew = async () => {
    // const docRef = doc(db, "colors", "color001");
    // const payload = {name: "Black", value: "#000"};
    // // setDoc adds a new document to the collection in the cloud firestore, it can be used to override data with the same document id
    // await setDoc(docRef, payload);
    // addDoc tells firestore to auto-id instead of having to manually code the id
    const name = prompt("Enter a color:");
    const value = prompt("Enter the color's value:");
    const collectionRef = collection(db, "colors");
    const payload = { name, value };
    const docRef = await addDoc(collectionRef, payload);
    console.log(`New id is: ${docRef.id}`);
}

export const handleEdit = async (id) => {
 const docRef = doc(db, "colors", id);
 const name = prompt("Enter a color:");
 const value = prompt("Enter the color's value:");
 const payload = { name, value };
 setDoc(docRef, payload);
}