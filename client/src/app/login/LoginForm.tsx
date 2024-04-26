'use client'

import Button from "@/components/Button";
import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";

const LoginForm: React.FC = (props) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post('http://localhost:8080/user/login', {
            email: email,
            password: password
        },{withCredentials: true /* Дозволяє передачу сесійних куки */})
            .then((response) =>{
                console.log(response)
            })
            .catch((error) =>{
                console.log(error)
            })
    }


    return (
        <form onSubmit={handleSubmit}>
            <input className='w-full border-b-2 border-black p-1 mt-3 mb-3'
                   type="email"
                   placeholder='ezbir@gmail.com'
                   value={email}
                   onChange={handleEmailChange}
            />
            <input className='w-full border-b-2 border-black p-1 mt-3 mb-3'
                   type="password"
                   placeholder='Пароль'
                   value={password}
                   onChange={handlePasswordChange}
            />

            <Button className='m-auto mt-3' primary value="Увійти"/>
        </form>
    );
};

export default LoginForm;
