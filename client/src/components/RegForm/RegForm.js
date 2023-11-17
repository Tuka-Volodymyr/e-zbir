import React from "react";
import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";

import RegFormCss from "./RegForm.module.css";


const RegForm = (props) =>{
    // Hook from react-hook-form "useForm"
    const {
        register,
        formState:{
            errors,
            isValid,
        },
        handleSubmit,
        reset,
    } = useForm({
        mode: "onBlur"
    });

    var postRegister;

    const onSubmit = (data) =>{
        alert(JSON.stringify(data))
        reset()
        axios.post('', {
            FullName: data.fullName,
            Email: data.email,
            Password: data.password,
            RepeatPassword: data.repeatPassword,
        })
          .then(function (response) {
              console.log(response);
          })
          .catch(function (error) {
              console.log(error);
          });
    }

    return(
      <div className = {RegFormCss.content}>
          <div className = {RegFormCss.regBlock}>
              <form onSubmit={handleSubmit(onSubmit)} className={RegFormCss.form}>
                  {/*Input Full Name*/}
                  <input
                    {...register("fullName", {
                        required: "Введіть своє імʼя",
                        minLength:{
                            value: 3,
                            message: "Мінімальна кількість символів: 3"
                        }
                    })} placeholder="Full name"/>
                  <div className={RegFormCss.errorForm} style={{height: 5}}>{errors?.fullName && <p>{errors?.fullName?.message || 'error'}</p>}</div>

                  {/*Input Email*/}
                  <input
                    {...register("email", {
                      required: "Введіть email"
                  })} placeholder="Email" type="email" />
                  <div className={RegFormCss.errorForm} style={{height: 5}}>{errors?.email && <p>{errors?.email?.message || 'error'}</p>}</div>

                  {/*Input Password*/}
                  <input {...register("password", {
                      required: "Введіть пароль",
                      minLength:{
                          value: 8,
                          message: "Мінімальна кількість символів: 8"
                      }
                  })} placeholder="Password" type="password" />
                  <div className={RegFormCss.errorForm} style={{height: 5}}>{errors?.password && <p>{errors?.password?.message || 'error'}</p>}</div>

                  <input {...register("repeatPassword", {
                      required: "Введіть пароль",
                      minLength:{
                          value: 8,
                          message: "Мінімальна кількість символів: 8"
                      }
                  })} placeholder="Repeat password" type="password" />
                  <div className={RegFormCss.errorForm} style={{height: 5}}>{errors?.repeatPassword && <p>{errors?.repeatPassword?.message || 'error'}</p>}</div>

                  {/*Submit BTN*/}
                  <button disabled={!isValid} className = {RegFormCss.loginBtn}>Registration</button>

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