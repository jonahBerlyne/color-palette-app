// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0onuXPQIdT2svnJHEog3tqieDVQJHYqo",
  authDomain: "color-palette-app-f30eb.firebaseapp.com",
  projectId: "color-palette-app-f30eb",
  storageBucket: "color-palette-app-f30eb.appspot.com",
  messagingSenderId: "665811233830",
  appId: "1:665811233830:web:0dbe350aec46eba407cae7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();