import db from "./firebase";
import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, setDoc, doc } from "firebase/firestore";
import { handleNew, handleEdit, handleDelete, handleQueryDelete } from "./util";
import Dot from "./Dot";

export default function App() {
  const [colors, setColors] = useState([{name: "Loading...", id: "loading"}]);

  console.log(colors);
  useEffect(() => {
    onSnapshot(collection(db, "colors"), (snapshot) => {
      setColors(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
    });
  }, []);


  return (
    <div className="root">
      <button className="button" onClick={handleNew}>New</button>
      <button className="button" onClick={handleQueryDelete}>Query Delete</button> 
      <ul>
        {colors.map(color => {
          return (
            <li key={color.id}>
            <button className="button2" onClick={() => handleEdit(color.id)}>Edit</button>
            <button className="button2" onClick={() => handleDelete(color.id)}>Delete</button> 
            <Dot color={color.value} />{color.name}
          </li>
          );
        })}
      </ul>
    </div>
  );
}
