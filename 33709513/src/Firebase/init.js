// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTGuysAoi-_9MNL1kxrpRFQo0gua-73rw",
  authDomain: "assignment03-2c89f.firebaseapp.com",
  projectId: "assignment03-2c89f",
  storageBucket: "assignment03-2c89f.appspot.com",
  messagingSenderId: "21324461164",
  appId: "1:21324461164:web:4854fc2719d1d85a651449"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore()
export default db
export { app }
