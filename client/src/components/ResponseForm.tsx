import React from "react";
import Button from "@/components/Button";

const ResponseForm: React.FC = (props) =>{
    return(
        <>
            <h2 className='flex justify-center'>Залиши свій відгук</h2>
            <form className='flex flex-col'>
                <input className='w-full border-b-2 border-black p-1 mt-3 mb-3'
                       type="email"
                       placeholder='ezbir@gmail.com'

                />
                <input className='w-full border-b-2 border-black p-1 mt-3 mb-3'
                       type="password"
                       placeholder='Пароль'

                />
                <Button className='flex justify-center' primary value='Відправити'/>
            </form>
        </>

    );
};

export default ResponseForm;
