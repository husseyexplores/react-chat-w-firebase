import React, { useState } from 'react'
import md5 from 'md5'

import firebase from '../firebase'

/////////////////////////////////////////////////////////////////////////////////

function SignUp() {
  const [error, setError] = useState(null)

  const handleSignUpWithEmail = async e => {
    e.preventDefault()
    const email = e.target.elements[0].value
    const password = e.target.elements[1].value
    const displayName = e.target.elements[2].value

    try {
      const createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

      await createdUser.user.updateProfile({
        displayName,
        photoURL: `http://gravatar.com/avatar/${md5(email)}?d=identicon`,
      })
      e.target.reset()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <>
      <p>Not a User? Sign Up!</p>

      <form onSubmit={handleSignUpWithEmail}>
        <input placeholder="Email Address" name="email" type="email" required />
        <input
          placeholder="Password"
          name="password"
          type="password"
          required
        />

        <input placeholder="Username" name="displayName" type="text" required />

        <button type="submit">Sign Up</button>
        {error && (
          <div className="error-wrapper">
            <p>Oops! there was a problem.</p>
            <p>
              <i>{error}</i>
            </p>
          </div>
        )}
      </form>
    </>
  )
}

export default SignUp
