import React, { useState } from 'react'

import firebase from '../firebase'

import SignUp from './SignUp'

/////////////////////////////////////////////////////////////////////////////////

function Login() {
  const [error, setError] = useState(null)

  // Form handlers
  const handleSignInWithEmail = async e => {
    e.preventDefault()
    const email = e.target.elements[0].value
    const password = e.target.elements[1].value

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (e) {
      setError(e.message)
    }
  }

  const handleSignInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    try {
      await firebase.auth().signInWithPopup(provider)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="Login">
      <h1>Chat</h1>
      <button onClick={handleSignInWithGoogle}>Sign-in with Google</button>

      <div>
        <p>OR Sign-in with Email</p>
      </div>
      <form onSubmit={handleSignInWithEmail}>
        <input
          autoFocus
          defaultValue="fred@chat.com"
          placeholder="Email Address"
          name="email"
          type="email"
          required
        />
        <input
          defaultValue="123456"
          placeholder="Password"
          name="password"
          type="password"
          required
        />

        <button type="submit">Sign In</button>
        {error && (
          <div className="error-wrapper">
            <p>Oops! there was a problem.</p>
            <p>
              <i>{error}</i>
            </p>
          </div>
        )}
      </form>
      <div style={{ marginTop: 50 }}>
        <SignUp />
      </div>
    </div>
  )
}

export default Login
