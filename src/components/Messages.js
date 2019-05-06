import React from 'react'
import { string } from 'prop-types'

import MessageWithAvatar from './MessageWithAvatar'
import { useCollection } from '../hooks'

import { userPropType } from '../common/proptypes'

/////////////////////////////////////////////////////////////////////////////////

function Messages({ channelId }) {
  const messages = useCollection(
    `collection(channels/${channelId}/messages).orderBy(createdAt)`
  )

  return (
    <div className="Messages">
      <div className="EndOfMessages">That’s every message!</div>

      <div>
        {Array.isArray(messages) &&
          messages.map((msg, idx) => {
            const showDay = false
            const prevMsg = messages[idx - 1]
            const showAvatar = shouldShowAvatar(prevMsg, msg)

            return showAvatar ? (
              <MessageWithAvatar message={msg} key={msg.id} showDay={showDay} />
            ) : (
              <div key={msg.id}>
                <div className="Message no-avatar">
                  <div className="MessageContent">{msg.text}</div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

function shouldShowAvatar(prevMsg, msg) {
  const isFirstMsg = !prevMsg
  if (isFirstMsg) {
    return true
  }

  const differentUser = msg.user.id !== prevMsg.user.id
  if (differentUser) {
    return true
  }

  const hasBeenAWhile = msg.createdAt.seconds - prevMsg.createdAt.seconds > 180 // more than 3 minutes

  return hasBeenAWhile
}

Messages.propTypes = {
  user: userPropType,
  channelId: string.isRequired,
}

export default Messages
