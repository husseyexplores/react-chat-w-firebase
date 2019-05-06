import React from 'react'
import PropTypes from 'prop-types'

/////////////////////////////////////////////////////////////////////////////////

function Members() {
  return (
    <div className="Members">
      <div>
        <div className="Member">
          <div className="MemberStatus offline" />
          Ryan Florence
        </div>
        <div className="Member">
          <div className="MemberStatus online" />
          cleverbot
        </div>
      </div>
    </div>
  )
}

Members.propTypes = {}

Members.defaultProps = {}

export default Members
