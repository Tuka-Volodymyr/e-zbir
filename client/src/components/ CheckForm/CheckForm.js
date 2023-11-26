import {useDispatch, useSelector} from "react-redux";

import CheckFormCss from './CheckForm.module.css'
import {useForm} from "react-hook-form";
import axios from "axios";

const CheckForm = (props) =>{


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
                console.log(response)
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