import React, { useRef } from 'react'
import { string } from 'prop-types'
import isSameDay from 'date-fns/is_same_day'

import MessageWithAvatar from './MessageWithAvatar'
import ChatScroll from './ChatScroll'
import { useCollection } from '../hooks'

import { userPropType } from '../common/proptypes'

/////////////////////////////////////////////////////////////////////////////////

function Messages({ channelId }) {
  const messages = useCollection(
    `collection(channels/${channelId}/messages).orderBy(createdAt)`
  )

  const scrollerRef = useRef()

  return (
    <ChatScroll scrollerRef={scrollerRef}>
      <div className="Messages" ref={scrollerRef}>
        <div className="EndOfMessages">That’s every message!</div>

        <div>
          {Array.isArray(messages) &&
            messages.map((msg, idx) => {
              const prevMsg = messages[idx - 1]
              const showDay = shoudShowDay(prevMsg, msg)
              const showAvatar = shouldShowAvatar(prevMsg, msg)

              return showAvatar ? (
                <MessageWithAvatar
                  message={msg}
                  key={msg.id}
                  showDay={showDay}
                />
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
    </ChatScroll>
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

function shoudShowDay(prevMsg, msg) {
  const isFirstMsg = !prevMsg
  if (isFirstMsg) {
    return true
  }

  const isNewDay = !isSameDay(
    prevMsg.createdAt.seconds * 1000,
    msg.createdAt.seconds * 1000
  )
  return isNewDay
}

Messages.propTypes = {
  user: userPropType,
  channelId: string.isRequired,
}

export default Messages
