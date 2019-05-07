import { useState, useEffect } from 'react'
import { getFirestoreRef } from '../utils/helpers'

import firebase, { firestore } from '../firebase'

/////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param {string} firestoreQuery - Firestore collection path
 */
export function useCollection(query) {
  const [docs, setDocs] = useState(null)

  useEffect(() => {
    return getFirestoreRef(query).onSnapshot(snap => {
      const docs = []
      snap.forEach(doc => {
        docs.push({ id: doc.id, ...doc.data() })
      })
      setDocs(docs)
    })
  }, [query])

  return docs
}

/////////////////////////////////////////////////////////////////////////////////

const docCache = {}
const docPendingCache = {}
/**
 *
 * @param {string} firestoreDocPath Doc Path - Firestore Doc Path
 */
export function useDocWithCache(path) {
  const [doc, setDoc] = useState(docCache[path])

  useEffect(() => {
    if (doc) {
      return
    }

    let stillMounted = true

    const pendingPromise = docPendingCache[path]
    const promise =
      pendingPromise || (docPendingCache[path] = firestore.doc(path).get())

    promise.then(doc => {
      if (stillMounted) {
        const data = {
          id: doc.id,
          ...doc.data(),
        }

        setDoc(data)
        docCache[path] = data
      }
    })

    return () => {
      stillMounted = false
    }
  }, [doc, path])

  return doc
}

/////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param {string} firestoreQuery - Firestore collection path
 */
export function useDoc(path) {
  const [doc, setDoc] = useState(null)

  useEffect(() => {
    return firestore.doc(path).onSnapshot(doc => {
      setDoc({ id: doc.id, ...doc.data() })
    })
  }, [path])

  return doc
}

/////////////////////////////////////////////////////////////////////////////////

/**
 * Firebase auth hook
 *
 * @return {{user:object, authIsReady:boolean}} Firebase Auth Status
 */
export function useAuth() {
  const [user, setUser] = useState(null)
  const [authIsReady, setAuthIsReady] = useState(null)

  // Auth listener
  useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      setAuthIsReady(true)
      if (firebaseUser) {
        const user = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        }

        setUser(user)

        // update user in firestore
        firestore
          .collection('users')
          .doc(user.uid)
          .set(user, { merge: true })
      } else {
        setUser(null)
      }
    })
  }, [])

  return { user, authIsReady }
}

/////////////////////////////////////////////////////////////////////////////////
