import React from "react";

import ForgPasswCss from './ForgPassw.module.css'

const ForgPassw = (props) => {
    return (
        <div className={ForgPasswCss.content}>
            <div className={ForgPasswCss.ForgBlock}>
                <form className={ForgPasswCss.form}>
                    <input placeholder="Enter your Email / Phone number" type="text" />
                    <button className={ForgPasswCss.loginBtn}>Search an account</button>
                </form>
                <div className={ForgPasswCss.regLink}>
                </div>
            </div>
        </div>
    );
};

export default ForgPassw;