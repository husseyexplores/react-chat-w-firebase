import React from 'react'
import { string } from 'prop-types'

import firebase, { firestore } from '../firebase'

import { userPropType } from '../common/proptypes'

/////////////////////////////////////////////////////////////////////////////////

function ChatInputBox({ user, channelId }) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        const { value } = e.target.elements[0] // get the first form element
        firestore
          .collection('channels')
          .doc(channelId)
          .collection('messages')
          .add({
            user: firestore.collection('users').doc(user.uid), // pass the ref
            text: value,
            createdAt: firebase.firestore.Timestamp.now(),
          })
        e.target.reset()
      }}
      className="ChatInputBox"
    >
      <input className="ChatInput" placeholder="Message #general" />
    </form>
  )
}

ChatInputBox.propTypes = {
  user: userPropType,
  channelId: string.isRequired,
}

export default ChatInputBox
