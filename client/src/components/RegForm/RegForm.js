import React from "react";
import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";

import RegFormCss from "./RegForm.module.css";


const RegForm = (props) =>{

    const {
        register,
        formState:{
            errors,
        },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) =>{
        alert(JSON.stringify(data))
    }

    return(
      <div className = {RegFormCss.content}>
          <div className = {RegFormCss.regBlock}>
              <form onSubmit={handleSubmit(onSubmit)} className={RegFormCss.form}>
                  {/*Input Full Name*/}
                  <input
                    {...register("fullName", {
                        required: "Input your name",
                        minLength:{
                            value: 3,
                            message: "Minimal amount of symbols: 3"
                        }
                    })} placeholder="Full name"/>
                  <div className={RegFormCss.errorForm} style={{height: 5}}>{errors?.fullName && <p>{errors?.fullName?.message || 'error'}</p>}</div>

                  {/*Input Email*/}
                  <input
                    {...register("Email", {
                      required: "Input your email"
                  })} placeholder="Email" type="email" />
                  <div className={RegFormCss.errorForm} style={{height: 5}}>{errors?.email && <p>{errors?.email?.message || 'error'}</p>}</div>

                  {/*Input Password*/}
                  <input
                      {...register("password", {
                      required: "Input password",
                      minLength:{
                          value: 8,
                          message: "Minimal amount of symbols: 8"
                      }
                  })} placeholder="Password" type="password" />
                  <div className={RegFormCss.errorForm} style={{height: 5}}>{errors?.password && <p>{errors?.password?.message || 'error'}</p>}</div>

                  <input {...register("repeatPassword", {
                      required: "Input password",
                      minLength:{
                          value: 8,
                          message: "Minimal amount of symbols: 8"
                      }
                  })} placeholder="Repeat password" type="password" />
                  <div className={RegFormCss.errorForm} style={{height: 5}}>{errors?.repeatPassword && <p>{errors?.repeatPassword?.message || 'error'}</p>}</div>

                  {/*Submit BTN*/}
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