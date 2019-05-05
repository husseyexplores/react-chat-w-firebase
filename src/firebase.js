import firebase from 'firebase'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'

import firebaseConfig from '../secret'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
export const db = firebase.database()
export const firestore = firebase.firestore()
export const auth = firebase.auth()
