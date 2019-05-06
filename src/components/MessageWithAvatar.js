import React from 'react'
import { shape, object, string, bool } from 'prop-types'
import formatDate from 'date-fns/format'

import { useDoc } from '../hooks'

/////////////////////////////////////////////////////////////////////////////////

function MessageWithAvatar({ message: msg, showDay }) {
  const author = useDoc(msg.user.path)

  return (
    <>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">12/6/2018</div>
          <div className="DayLine" />
        </div>
      )}

      <div className="Message with-avatar">
        <div
          className="Avatar"
          style={{ backgroundImage: author ? `url("${author.photoURL}")` : '' }}
        />
        <div className="Author">
          <div>
            <span className="UserName">
              {author && author.displayName ? author.displayName : 'Anoymous'}
            </span>{' '}
            <span className="TimeStamp">
              {formatDate(msg.createdAt.seconds * 1000, 'h:mm A')}
            </span>
          </div>
          <div className="MessageContent">{msg.text}</div>
        </div>
      </div>
    </>
  )
}

MessageWithAvatar.propTypes = {
  message: shape({
    user: object.isRequired,
    text: string.isRequired,
    createdAt: object.isRequired,
  }).isRequired,
  showDay: bool.isRequired,
}

export default MessageWithAvatar
