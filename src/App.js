import db from "./firebase";
import React, { useState, useEffect } from 'react';
import { onSnapshot, collection } from "firebase/firestore";

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


  return (
    <div className="root">
      <button className="button">New</button>
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
