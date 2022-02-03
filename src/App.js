import db from "./firebase";
import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, setDoc, doc } from "firebase/firestore";
import { handleNew, handleEdit } from "./util";
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
      <ul>
        {colors.map(color => {
          return (
            <li key={color.id}>
            <a href="#" onClick={() => handleEdit(color.id)}>edit</a> <Dot color={color.value} />{color.name}
          </li>
          );
        })}
      </ul>
    </div>
  );
}
