'use client'

import Button from "@/components/Button";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {Modal } from 'antd';
import axios from "axios";
import CheckCodeForm from "@/components/CheckCodeForm";

const RegForm: React.FC = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUserName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleRepeatPasswordChange = (e:ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value)
    }
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post('http://localhost:8080/user/register', {
            username: username,
            email: email,
            password: password,
            repeatPassword: repeatPassword
        },{withCredentials: true /* Дозволяє передачу сесійних куки */})
            .then((response) =>{
                console.log(response)
                showModal()
                axios.post('http://localhost:8080/user/send/code?email='+`${email}`, {
                    email: email,
                },{withCredentials: true /* Дозволяє передачу сесійних куки */})
                    .then(function (response){
                        console.log(response)
                    })
                    .catch(function (error){
                        console.log(error)
                    })

            })
            .catch((error) =>{
                console.log(error)
            })
    }


    return (
        <form onSubmit={handleSubmit}>
            <input className='w-full border-b-2 border-black p-1 mt-3 mb-3'
                   type="text"
                   placeholder='Іван Петренко'
                   value={username}
                   onChange={handleUsernameChange}
            />
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
            <input className='w-full border-b-2 border-black p-1 mt-3 mb-3'
                   type="password"
                   placeholder='Повторіть пароль'
                   value={repeatPassword}
                   onChange={handleRepeatPasswordChange}
            />

            <Modal
                   open={isModalOpen}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   footer={[]}>
                <CheckCodeForm/>
            </Modal>
            <Button className='m-auto mt-3' primary value="Зареєструватися"/>
        </form>
    )
};

export default RegForm;
