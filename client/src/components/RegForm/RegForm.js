import React, {useState} from "react";
import {NavLink, Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";


import RegFormCss from "./RegForm.module.css";


const RegForm = (props) =>{

    const dispatch = useDispatch()

    // set HttpRequest status
    const [status, setStatus] = useState(0)

    // set Error form
    const [error, setError] = useState('')

    // Hook from react-hook-form "useForm"
    const {
        register,
        formState:{
            errors,
            isValid,
        },
        handleSubmit,
        reset,
    } = useForm({mode: "onBlur"});

    // POST Form to backend
    const onSubmit = (data) =>{
        reset()

        dispatch({type:'SET_EMAIL', payload: data.email})

        axios.post('http://localhost:8080/user/register', {
            username: data.fullName,
            email: data.email,
            password: data.password,
            repeatPassword: data.repeatPassword,
        },{withCredentials: true /* Дозволяє передачу сесійних куки */})
          .then(function (response) {
              setStatus(response.status);

              axios.post('http://localhost:8080/user/send/code?email='+`${data.email}`, {
                  email: data.email,
              },{withCredentials: true /* Дозволяє передачу сесійних куки */})
                  .then(function (response){
                      console.log(response)
                  })
                  .catch(function (error){
                      console.log(error)
                  })

          })
          .catch(function (error) {
              setError(error.response.data.message);
          });
    }

    return(
      <div className = {RegFormCss.content}>

          {status === 200 ? <Navigate to='/checkform'/> : ""}{/*Redirect to checkForm*/}

          <div className = {RegFormCss.regBlock}>
              <form onSubmit={handleSubmit(onSubmit)} className={RegFormCss.form}>
                  {/*Input Full Name*/}
                  <input{...register("fullName")} placeholder="Full name"/>

                  {/*Input Email*/}
                  <input{...register("email")} placeholder="Email" type="email" />

                  {/*Input Password*/}
                  <input {...register("password")} placeholder="Password" type="password" />

                  {/*Input Repeat Password*/}
                  <input {...register("repeatPassword")} placeholder="Repeat password" type="password" />

                  {/*Submit BTN*/}
                  <div className={RegFormCss.errorForm}>{error}</div>
                  <button disabled={!isValid} className = {RegFormCss.loginBtn}>Registration</button>
              </form>

              <div className={RegFormCss.blockOr}>
                  <div className={RegFormCss.line}></div>
                  <p>OR</p>
                  <div className={RegFormCss.line}></div>
              </div>

              <div className={RegFormCss.loginLink}>
                  <p>Have an account? <NavLink to='/login'>Log In</NavLink></p>
              </div>

          </div>
      </div>
    );
};

export default RegForm;