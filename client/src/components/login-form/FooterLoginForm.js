import React from 'react'

export default function FooterLoginForm() {
  return (
      <footer>
          <div className="rectangle">
              <input placeholder="Email/Phone number" type="text" className="email" />
              <input placeholder="Password" type="text" className="password" />
              <button className="login">Log in</button>
              <a href=" " className="forgetpassword">Forgot password?</a>
              {/*OR*/}
              <button className="signup">Don't have an account? <span>Sign up</span> </button>
          </div>
    </footer>
  )
}
