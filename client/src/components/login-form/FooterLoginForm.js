import React from 'react'

export default function FooterLoginForm() {
  return (
      <footer>
      <div className="square">
        <form>
              <input placeholder="Email/Phone number" type="text" className="email" />
              <input placeholder="Password" type="text" className="password" />
              <button className="login">Log in</button>
        </form>
              
              <a href=" " className="forgotpassword">Forgot password?</a>
              <button className="btn-signup">Don't have an account? <p>Sign up</p> </button>
          </div>
    </footer>
  )
}
