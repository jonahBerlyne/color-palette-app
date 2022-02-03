import db from "./firebase";
import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, setDoc, doc, addDoc } from "firebase/firestore";

const Dot = ({color}) => {
  const style = {
    height: 25,
    width: 25,
    margin: "0px 10px",
    backgroundColor: color,
    borderRadius: "50%",
    display: "inline-block"
  }
  return <span style={style}></span>;
}

export default function App() {
  const [colors, setColors] = useState([{name: "Loading...", id: "loading"}]);

  console.log(colors);
  useEffect(() => {
    onSnapshot(collection(db, "colors"), (snapshot) => {
      setColors(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
    });
  }, []);

  const handleNew = async () => {
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


  return (
    <div className="root">
      <button className="button" onClick={handleNew}>New</button>
      <ul>
        {colors.map(color => {
          return (
            <li key={color.id}>
            <a href="#">edit</a> <Dot color={color.value} />{color.name}
          </li>
          );
        })}
      </ul>
    </div>
  );
}
