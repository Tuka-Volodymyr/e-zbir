
import React from "react";
import RegForm from "@/app/register/RegForm";
import OtherAuth from "@/components/OtherAuth";
import {useRouter} from "next/navigation";

const Register: React.FC = (props) => {

    return (
        <article className='w-3/4 bg-white flex flex-col items-center'>
            <section className='mt-[100px]'>
                <h3>Реєстрація в додатку</h3>
            </section>
            <section className='w-3/4'>
                <RegForm/>
            </section>
            <section className='flex w-full justify-around mt-[100px]'>
                <OtherAuth value='Увійти з Дія.Підпис' link='/diia'/>
                <OtherAuth value='Авторизація' link='/login'/>
            </section>

        </article>
    );
};

export default Register;
