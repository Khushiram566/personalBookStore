// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU3fDjpyEEkW9HBhxqwJNx6XUhnfrlFCg",
  authDomain: "mern-book-inventory-2a592.firebaseapp.com",
  projectId: "mern-book-inventory-2a592",
  storageBucket: "mern-book-inventory-2a592.appspot.com",
  messagingSenderId: "825233769171",
  appId: "1:825233769171:web:a11b6840c2ff5e487b4a26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;