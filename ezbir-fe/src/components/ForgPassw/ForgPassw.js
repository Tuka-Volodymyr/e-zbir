import React from "react";
import {useForm} from "react-hook-form";

import ForgPasswCss from './ForgPassw.module.css'

const ForgPassw = (props) =>{

    const {
        register,
        formState:{
            errors,
        },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data))
    }

    return (
        <div className={ForgPasswCss.content}>
            <div className={ForgPasswCss.ForgBlock}>

                <form  onSubmit={handleSubmit(onSubmit)} className={ForgPasswCss.form}>
                    <input
                        {...register("Email",{
                            required:"Input your email"
                        })} placeholder="Enter your Email" type="email" />
                    <div className={ForgPasswCss.errorForm} style={{height: 5}}>{errors?.email && <p>{errors?.email?.message || 'error'}</p>}</div>

                    <button className={ForgPasswCss.loginBtn}>Search an account</button>
                </form>

            </div>
        </div>
    );
};

export default ForgPassw;