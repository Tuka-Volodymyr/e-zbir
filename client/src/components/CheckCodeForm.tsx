import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import axios from "axios";

const CheckCodeForm: React.FC = () => {
    const [checkCode, setCheckCode] = useState<string>('')
    const [redirect, setRedirect] = useState<boolean>(false);

    const handleCheckCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCheckCode(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/user/check/code?code=${checkCode}`, {
            code: checkCode
        }, { withCredentials: true })
            .then((response) => {
                console.log(response);
                if(response.status === 200){
                    setRedirect(true)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (redirect) {
            window.location.href = "/login";
        }
    }, [redirect]);

    return (
        <form onSubmit={handleSubmit}>
            <h4>Перевірка пошти</h4>
            <p className='text-gray-500'>Будь ласка введіть код підтвердження з електроної пошти</p>
            <input className='w-full border-b-2 border-black p-1 mt-3 mb-3'
                   type="text"
                   placeholder='1234567890'
                   value={checkCode}
                   onChange={handleCheckCodeChange}
            />
            <button className='m-auto mt-3' type="submit">Відправити</button>
        </form>
    );
};

export default CheckCodeForm;
