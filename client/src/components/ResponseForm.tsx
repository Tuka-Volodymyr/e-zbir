import React from "react";
import Button from "@/components/Button";

const ResponseForm: React.FC = (props) =>{
    return(
        <>
            <h2 className='flex justify-center mt-20'>Залиши свій відгук</h2>
            <form className='flex flex-col mb-10'>
                <input className='w-full border-b-2 border-black p-1 mt-3 mb-3'
                       type="email"
                       placeholder='ezbir@gmail.com'

                />
                <input className='w-full border-b-2 border-black p-1 mt-3 mb-3'
                       type="text"
                       placeholder='Відгук/Побажання'

                />
                <div className="flex justify-center mt-2">
                    <Button className='flex justify-center' primary value='Відправити'/>
                </div>
            </form>
        </>

    );
};

export default ResponseForm;
