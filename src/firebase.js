import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'

import { firebaseConfig } from './secret'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
export const rtdb = firebase.database()
export const firestore = firebase.firestore()
export const auth = firebase.auth()

export function setupPresence(user) {
  const ref = rtdb.ref(`status/${user.uid}`)
  const userDoc = firestore.doc(`/users/${user.uid}`)

  const userOnlineDataRTDB = {
    state: 'online',
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  }

  const userOfflineDataRTDB = {
    state: 'offline',
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  }

  const userOnlineDataFirestore = {
    state: 'online',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  }

  const userOfflineDataFirestore = {
    state: 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  }

  rtdb.ref('.info/connected').on('value', async snap => {
    if (snap.val() === false) {
      userDoc.update({
        status: userOfflineDataFirestore,
      })
      return
    }

    await ref.onDisconnect().set(userOfflineDataRTDB)

    ref.set(userOnlineDataRTDB)
    userDoc.update({
      status: userOnlineDataFirestore,
    })
  })
}

window.firebase = firebase
window.firestore = firestore
