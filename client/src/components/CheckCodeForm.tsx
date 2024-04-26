'use client'

import Button from "@/components/Button";
import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";

const CheckCodeForm: React.FC = (props) =>{
    const [checkCode, setCheckCode] = useState<string>('')

    const handleCheckCodeChange = (e:ChangeEvent<HTMLInputElement>) =>{
        setCheckCode(e.target.value)
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
        axios.post(`http://localhost:8080/user/check/code?code=${checkCode}`, {
            code: checkCode
        },{withCredentials: true /* Дозволяє передачу сесійних куки */})
            .then((response) =>{
                console.log(response)
            })
            .catch((error) =>{
                console.log(error)
            })
    }

    return(
        <form onSubmit={handleSubmit}>
            <input className='w-full border-b-2 border-black p-1 mt-3 mb-3'
                   type="text"
                   placeholder='1234567890'
                   value={checkCode}
                   onChange={handleCheckCodeChange}
            />
            <Button className='m-auto mt-3' primary value="Відправити"/>
        </form>
    );
};

export default CheckCodeForm;
