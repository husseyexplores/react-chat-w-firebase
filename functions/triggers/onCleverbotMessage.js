const functions = require('firebase-functions')
const admin = require('firebase-admin')
const axios = require('axios')
const { DIALOGFLOW_API_KEY } = require('../secret')

const firestore = admin.firestore()

const bot = {
  displayName: 'cleverbot',
  photoURL:
    'https://firebasestorage.googleapis.com/v0/b/react-chat-w-rpf.appspot.com/o/bot-small.png?alt=media&token=a16397b1-b5ae-4883-9ba1-34acf6ef8b58',
  uid: 'cleverbot',
  status: {
    state: 'online',
    lastChanged: new Date(),
  },
  channels: {
    general: true,
  },
}

// Add the bot to firestore
firestore
  .collection('users')
  .doc(bot.uid)
  .set(bot, { merge: true })

function sendMessageToBot(query, userUid) {
  return axios
    .post(
      'https://api.dialogflow.com/v1/query?v=20150910',
      {
        lang: 'en',
        query,
        sessionId: userUid,
        timezone: 'America/New_York',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${DIALOGFLOW_API_KEY}`,
        },
      }
    )
    .then(response => {
      let botResponse
      try {
        botResponse = response.data.result.fulfillment.speech
      } catch (e) {
        console.error(response)
        botResponse = 'Some error occured :( Please try again.'
      }
      return botResponse
    })
    .catch(e => {
      console.error(e)
      return 'Some error occured :( Please try again.'
    })
}

module.exports = functions.firestore
  .document('channels/general/messages/{messageId}')
  .onCreate(doc => {
    const msg = doc.data()
    const userIsTalkingToBot = msg.text.toLowerCase().startsWith('@cleverbot')
    const senderIsBotItself = msg.user.path.includes('users/cleverbot')

    if (!userIsTalkingToBot || senderIsBotItself) {
      return
    }

    const userUid = msg.user.path.split('/').pop()
    const query = msg.text.replace(/^@cleverbot/gi, '').trim()

    return sendMessageToBot(query, userUid).then(botResponse => {
      return firestore.collection('channels/general/messages').add({
        text: botResponse,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        user: firestore.collection('users').doc('cleverbot'),
      })
    })
  })
