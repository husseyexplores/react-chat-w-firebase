import React from 'react'
import { string } from 'prop-types'
import { useDoc } from '../hooks'

/////////////////////////////////////////////////////////////////////////////////

function ChannelInfo({ channelId }) {
  const channel = useDoc(`channels/${channelId}`)

  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic:{' '}
        <input
          className="TopicInput"
          value={channel ? channel.topic : '...'}
          readOnly
        />
      </div>
      <div className="ChannelName">#{channelId}</div>
    </div>
  )
}

ChannelInfo.propTypes = {
  channelId: string.isRequired,
}

export default ChannelInfo
