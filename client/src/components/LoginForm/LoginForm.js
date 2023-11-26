import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";

import LoginFormCss from './Login.module.css'
import RegFormCss from "../RegForm/RegForm.module.css";
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
            username:data.email,
            password:data.password,
        },{withCredentials: true /* Дозволяє передачу сесійних куки */})
            .then(function (response){
                setStatus(response.status)
                console.log(response);
            })
            .catch(function (error){
                console.log(error);
            });
    }

    const Logout = () =>{
        console.log('1')
        axios.post('http://localhost:8080/user/search?keyword=rus',{

        })
            .then((response) =>{
                console.log(response)
            })
            .catch((error) =>{
                console.log(error)
            })
    }

    return(
    <div className = {LoginFormCss.content}>
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


                {status === 0 ? <button disabled={!isValid} className = {LoginFormCss.loginBtn}>Log in</button>  :  ""}


            </form>

            {status === 200 ? <button onClick={Logout} className = {LoginFormCss.logoutBtn}>Log out</button>  :  ""}



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