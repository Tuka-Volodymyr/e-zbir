import {useDispatch, useSelector} from "react-redux";

import CheckFormCss from './CheckForm.module.css'
import {useForm} from "react-hook-form";
import axios from "axios";
import React, {useState} from "react";
import {Navigate} from "react-router-dom";

const CheckForm = (props) =>{

    const [status, setStatus] = useState(0)


    const {
        register,
        formState:{
            errors,
            isValid,

        },
        handleSubmit,
        reset,
    } = useForm({mode: "onBlur"})

    const onSubmit = (data) => {
        reset()

        axios.post('http://localhost:8080/check/code?code=' + `${data.code}`,{
            code: data.code,
        },{withCredentials: true /* Дозволяє передачу сесійних куки */})
            .then((response) => {
                setStatus(response.status)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    // get state (RegForm >> email)
    const dispatch = useDispatch()
    const email = useSelector(state => state.email)

    return(
    <div className = {CheckFormCss.content}>
        <div>{status === 200 ? <Navigate to='/login'/> : ""}</div>{/*Redirect to checkForm*/}

        <div className={CheckFormCss.text}>
            <p>Для підтвердження реєстрації введіть код який був надісланий на вашу пошту "{email}"</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={CheckFormCss.form}>
            <input {...register('code')} type="text"/>

            <button className={CheckFormCss.submit}>Send Code</button>
        </form>
    </div>
    );
};

export default CheckForm;