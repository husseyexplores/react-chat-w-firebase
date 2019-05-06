import React from 'react'
import { Router, Redirect } from '@reach/router'

import { Nav, Channel, Login } from './components'
import { useAuth } from './hooks'

/////////////////////////////////////////////////////////////////////////////////

function App() {
  const { user, authIsReady } = useAuth()

  if (!authIsReady) {
    return <div>Loading...</div>
  }

  return user ? (
    <div className="App">
      <Nav user={user} />

      <Router>
        <Channel path="channel/:channelId" user={user} />
        <Redirect from="/" to="channel/general" noThrow />
      </Router>
    </div>
  ) : (
    <Login />
  )
}

export default App
