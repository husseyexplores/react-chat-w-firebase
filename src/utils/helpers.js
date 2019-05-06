import { firestore } from '../firebase'

export function makeSpreadable(arg) {
  return Array.isArray(arg) ? arg : [arg]
}

/**
 *
 * @param {string} firestoreQuery - Path to firebase db collection
 */
export function getFirestoreRef(query) {
  if (
    !firestore ||
    !(firestore instanceof Object) ||
    typeof firestore.collection !== 'function'
  ) {
    throw new Error(
      'Firestore object is invalid. Please check `getFirestoreRef` function'
    )
  }

  let ref = firestore
  const _query = query.replace(/"|'|\)$/g, '').split(/\(|\)/g)
  if (_query.length % 2 !== 0) {
    throw new Error(`${query}. Invalid firestore query.`)
  }

  for (let i = 0; i < _query.length; i += 2) {
    const fn = _query[i].replace(/^\./g, '')
    const args = makeSpreadable(_query[i + 1])

    try {
      ref = ref[fn](...args)
    } catch (e) {
      console.error(e) // eslint-disable-line no-console
      throw new Error(
        'Error occured while building Firestore query. Please provide a valid query.'
      )
    }
  }
  return ref
}
