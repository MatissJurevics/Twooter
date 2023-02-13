// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBQhBjTNHODUoRZT5nt_vDHzFYOyQ-hCN0",
  authDomain: "twooter-c4765.firebaseapp.com",
  projectId: "twooter-c4765",
  storageBucket: "twooter-c4765.appspot.com",
  messagingSenderId: "1063581052213",
  appId: "1:1063581052213:web:185ef921d913ee186ff07c",
  measurementId: "G-JJZ0ZXZS8E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { auth, db };