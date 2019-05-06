import React from 'react'
import { string } from 'prop-types'

import ChannelInfo from './ChannelInfo'
import Messages from './Messages'
import ChatInputBox from './ChatInputBox'
import Members from './Members'

import { userPropType } from '../common/proptypes'

/////////////////////////////////////////////////////////////////////////////////

function Channel({ user, channelId }) {
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo channelId={channelId} />
        <Messages user={user} channelId={channelId} />
        <ChatInputBox user={user} channelId={channelId} />
      </div>
      <Members />
    </div>
  )
}

Channel.propTypes = {
  user: userPropType,
  channelId: string,
}

export default Channel
