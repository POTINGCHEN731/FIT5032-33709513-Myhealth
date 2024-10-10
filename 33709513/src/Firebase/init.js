// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCAPiN1WZAWQYe93RV-Di-UhUHVfbbHvfo',
  authDomain: 'assignment03-728b3.firebaseapp.com',
  projectId: 'assignment03-728b3',
  storageBucket: 'assignment03-728b3.appspot.com',
  messagingSenderId: '935376639529',
  appId: '1:935376639529:web:8f48ca8e63d755a0f8ae38'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore()
export default db
export { app }
