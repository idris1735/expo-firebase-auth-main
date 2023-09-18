import { initializeApp } from 'firebase/app'
// import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
// import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyBw7SGFtrn_6u9zRyimpDhxbjHcD5jhHpY',
  authDomain: 'retailrise-b9e08.firebaseapp.com',
  databaseURL: 'https://retailrise-b9e08-default-rtdb.firebaseio.com',
  projectId: 'retailrise-b9e08',
  storageBucket: 'retailrise-b9e08.appspot.com',
  messagingSenderId: '890778308354',
  appId: '1:890778308354:web:cdf45fab5f5f1b458ffc1b',
  measurementId: 'G-P6398X0XKJ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const db = getFirestore(app)
const auth = getAuth(app)
const database = getDatabase(app)

export { auth, app, database }
