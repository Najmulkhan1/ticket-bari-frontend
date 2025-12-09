// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrEyiKH_aqT-vmSAaXUwRzNxX7GymgGhk",
  authDomain: "ticket-bari-88c5d.firebaseapp.com",
  projectId: "ticket-bari-88c5d",
  storageBucket: "ticket-bari-88c5d.firebasestorage.app",
  messagingSenderId: "721996678562",
  appId: "1:721996678562:web:268cb85f4238eff9219efb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);