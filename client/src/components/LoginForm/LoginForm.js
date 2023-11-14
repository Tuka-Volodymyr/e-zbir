import React from "react";
import {NavLink} from "react-router-dom";

import LoginFormCss from './Login.module.css'
const LoginForm = (props) =>{
    return(
    <div className = {LoginFormCss.content}>
        <div className = {LoginFormCss.loginBlock}>
            <form className={LoginFormCss.form}>
                <input placeholder="Email / Phone number" type="text" />
                <input placeholder="Password" type="text" />
                <button className = {LoginFormCss.loginBtn}>Log in</button>
            </form>
            <div className={LoginFormCss.blockOr}>
                <div className={LoginFormCss.line}></div>
                <p>OR</p>
                <div className={LoginFormCss.line}></div>
            </div>
            <a href="/" className = {LoginFormCss.forgotpassword}>Forgot password?</a>
            <div className={LoginFormCss.regLink}>
                <p>Don’t have an account? <NavLink to='/reg'>Sign up</NavLink></p>
            </div>
        </div>
    </div>
    );
};

export default LoginForm;