import React, { useEffect } from 'react'
import { string } from 'prop-types'

import { firestore } from '../firebase'
import { userPropType } from '../common/proptypes'

import ChannelInfo from './ChannelInfo'
import Messages from './Messages'
import ChatInputBox from './ChatInputBox'
import Members from './Members'

/////////////////////////////////////////////////////////////////////////////////

function Channel({ user, channelId }) {
  // update users channels in firestore
  useEffect(() => {
    firestore.doc(`users/${user.uid}`).update({
      [`channels.${channelId}`]: true,
    })
  }, [channelId, user])

  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo channelId={channelId} />
        <Messages user={user} channelId={channelId} />
        <ChatInputBox user={user} channelId={channelId} />
      </div>
      <Members channelId={channelId} />
    </div>
  )
}

Channel.propTypes = {
  user: userPropType,
  channelId: string,
}

export default Channel
