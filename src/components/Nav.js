import React from 'react'
import { Link } from '@reach/router'

import { useCollection } from '../hooks'
import { auth } from '../firebase'

import { userPropType } from '../common/proptypes'

/////////////////////////////////////////////////////////////////////////////////

function Nav({ user: { photoURL, displayName } }) {
  const channels = useCollection('collection(channels)')

  return (
    <div className="Nav">
      <div className="User">
        <img
          className="UserImage"
          alt="whatever"
          src={photoURL ? photoURL : 'https://placekitten.com/64/64'}
        />
        <div>
          <div>{displayName}</div>
          <div>
            <button className="text-button" onClick={() => auth.signOut()}>
              log out
            </button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {Array.isArray(channels) &&
          channels.map(channel => (
            <Link key={channel.id} to={`/channel/${channel.id}`}>
              # {channel.id}
            </Link>
          ))}
      </nav>
    </div>
  )
}

Nav.propTypes = {
  user: userPropType,
}

Nav.defaultProps = {}

export default Nav
