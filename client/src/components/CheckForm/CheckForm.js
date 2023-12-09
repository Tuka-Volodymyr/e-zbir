import {useSelector} from "react-redux";

import CheckFormCss from './CheckForm.module.css'
import {useForm} from "react-hook-form";
import axios from "axios";
import {useState} from "react";
import {Navigate} from "react-router-dom";

const CheckForm = (props) =>{

    const [status, setStatus] = useState(0)

    const {
        register,
        handleSubmit,
        reset,
    } = useForm({mode: "onBlur"})

    const onSubmit = (data) => {
        reset()

        axios.post(`http://localhost:8080/user/check/code?code=${data.code}`,{
            code: data.code,
        },{withCredentials: true /* Дозволяє передачу сесійних куки */})
            .then((response) => {
                console.log(response)
                setStatus(response.status)
                window.sessionStorage.setItem('auth_token', response.data.token)
                window.sessionStorage.setItem('username', response.data.username)
                window.sessionStorage.setItem('infoAboutYourself', response.data.infoAboutYourself)
                window.sessionStorage.setItem('bytePhoto', response.data.bytePhoto)
                window.sessionStorage.setItem('infoAboutYourself', response.data.infoAboutYourself)
                window.sessionStorage.setItem('email', data.email)
                window.sessionStorage.setItem('login', true)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    // get state (RegForm >> email)
    const email = useSelector(state => state.checkEmail.email)

    return(
    <div className = {CheckFormCss.content}>
        {status === 200 ? <Navigate to='/'/> : '' }
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