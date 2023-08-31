import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA18QXQ1r-fwSqExz86RWTtjeUZDo8gMmQ',
  authDomain: 'retailrise-ef9d2.firebaseapp.com',
  projectId: 'retailrise-ef9d2',
  storageBucket: 'retailrise-ef9d2.appspot.com',
  messagingSenderId: '615302446876',
  appId: '1:615302446876:web:e18d16216c4c04ca3b44d9',
  measurementId: 'G-4HRX03FK3B',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { auth, db }
