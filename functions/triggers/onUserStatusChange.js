const functions = require('firebase-functions')
const admin = require('firebase-admin')

const firestore = admin.firestore()

module.exports = functions.database
  .ref('status/{userId}')
  .onUpdate((change, context) => {
    // eventStatus == user online/offline status

    const eventStatus = change.after.val()
    const userDoc = firestore.doc(`users/${context.params.userId}`)

    return change.after.ref.once('value').then(snap => {
      const status = snap.val()
      /*
        make sure the eventStatus is actually latest
        if we already have the latest written in rtdb,
        then do not update firestore
        (This whole song and dance because events are
        not guaranteed to come in the right order)
      */
      if (status.lastChanged > eventStatus.lastChanged) {
        return
      }

      eventStatus.lastChanged = new Date(eventStatus.lastChanged)
      userDoc.update({
        status: eventStatus,
      })
    })
  })
