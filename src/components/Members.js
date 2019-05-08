import React from 'react'
import { string } from 'prop-types'

import { useCollection } from '../hooks'

/////////////////////////////////////////////////////////////////////////////////

function Members({ channelId }) {
  const members = useCollection('users', {
    where: [`channels.${channelId}`, '==', true],
  })

  return (
    <div className="Members">
      <div>
        {Array.isArray(members) &&
          members.sort(sortByName).map(member => (
            <div key={member.id} className="Member">
              <div
                className={`MemberStatus ${member.status &&
                  member.status.state}`}
              />
              {member.displayName}
            </div>
          ))}
      </div>
    </div>
  )
}

function sortByName(a, b) {
  return a.displayName > b.displayName
    ? 1
    : a.displayName < b.displayName
    ? -1
    : 0
}

Members.propTypes = {
  channelId: string.isRequired,
}

export default Members
