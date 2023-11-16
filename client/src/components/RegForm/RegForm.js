import React from "react";
import {NavLink} from "react-router-dom";

import RegFormCss from "./RegForm.module.css";


const RegForm = (props) =>{
    return(
      <div className = {RegFormCss.content}>
          <div className = {RegFormCss.regBlock}>
              <form className={RegFormCss.form}>
                  <input placeholder="Username" type="text" />
                  <input placeholder="Email / Phone number" type="text" />
                  <input placeholder="Password" type="text" />
                  <input placeholder="Repeat password" type="text" />
                  <button className = {RegFormCss.loginBtn}>Registration</button>
              </form>
              <div className={RegFormCss.blockOr}>
                  <div className={RegFormCss.line}></div>
                  <p>OR</p>
                  <div className={RegFormCss.line}></div>
              </div>
              <div className={RegFormCss.loginLink}>
                  <p>Have an account? <NavLink to='/'>Log In</NavLink></p>
              </div>
          </div>
      </div>
    );
};

export default RegForm;