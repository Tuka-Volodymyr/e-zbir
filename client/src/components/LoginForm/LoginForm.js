import {Navigate, NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";

import LoginFormCss from './Login.module.css'
import RegFormCss from "../RegForm/RegForm.module.css";
import React, {useState} from "react";
const LoginForm = (props) =>{

    const [status, setStatus] = useState(0)

    const {
        register,
        formState:{
            errors,
            isValid,
        },
        handleSubmit,
        reset,
    } = useForm({
        mode:"onBlur"
    });

    const onSubmit = (data)=>{
        reset()

        axios.post('http://localhost:8080/login',{
            email:data.email,
            password:data.password,
        },{withCredentials: true /* Дозволяє передачу сесійних куки */})
            .then(function (response){
                console.log(response)
                setStatus(response.status);
                window.localStorage.setItem('auth_token', response.data.token)
                window.localStorage.setItem('username', response.data.username)
                window.localStorage.setItem('infoAboutYourself', response.data.infoAboutYourself)
                window.localStorage.setItem('bytePhoto', response.data.bytePhoto)
                window.localStorage.setItem('fundraiserList', response.data.fundraiserList)
                window.localStorage.setItem('email', data.email)
                window.localStorage.setItem('login', true)
            })
            .catch(function (error){
                console.log(error);
            });
    }


    return(
    <div className = {LoginFormCss.content}>

        <div>{status === 200 ? <Navigate to='/profile'/> : ""}</div>{/*Redirect to profile*/}

        <div className = {LoginFormCss.loginBlock}>
            <form onSubmit={handleSubmit(onSubmit)} className={LoginFormCss.form}>

                {/*Input Email*/}
                <input
                    {...register("email", {
                        required:"Input your email"
                    })} placeholder="Email" type="email" />
                <div className={LoginFormCss.errorForm} style={{height: 5}}>{errors?.email && <p>{errors?.email?.message || 'error'}</p>}</div>

                {/*Input Password*/}
                <input {...register("password",{
                    required: "Input your password",
                    minLength:{
                        value: 6,
                        message: "Minimal amount of symbols: 6"
                    }
                })} placeholder="Password" type="password" autoComplete='on'  />
                <div className={RegFormCss.errorForm} style={{height: 5}}>{errors?.password && <p>{errors?.password?.message || 'error'}</p>}</div>


                <button disabled={!isValid} className = {LoginFormCss.loginBtn}>Log in</button>


            </form>




            <div className={LoginFormCss.blockOr}>
                <div className={LoginFormCss.line}></div>
                <p>OR</p>
                <div className={LoginFormCss.line}></div>
            </div>
            <NavLink className = {LoginFormCss.forgotpassword}  to='/ver'>Forgot password?</NavLink>
            <div className={LoginFormCss.regLink}>
                <p>Don’t have an account? <NavLink to='/register'>Sign up</NavLink></p>
            </div>
        </div>
    </div>
    );
};

export default LoginForm;