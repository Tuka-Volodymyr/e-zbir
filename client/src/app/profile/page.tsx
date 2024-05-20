'use client'

import CreateFundraiserMenu from "@/components/CreateFundraiserMenu";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";


const Profile: React.FC = (props) =>{
    const router = useRouter();

    useEffect(() => {
        const token:string | null = sessionStorage.getItem('auth_token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    return(
        <main className='flex flex-col h-[700px] items-center'>
            <section className='flex flex-grow p-4 w-[80%] mt-4'>
                <section>
                    <Avatar shape="square" size={256} icon={<img src='/img/userIcon.svg' alt="avatar"/>}/>
                </section>
                <section className='flex flex-col pl-4'>
                    <p>
                        Імʼя:
                        <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{window.sessionStorage.getItem('username')}
                    </p>
                    <br/>
                    <p>
                        Електронна пошта:
                        <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{window.sessionStorage.getItem('email')}
                    </p>
                    <br/>
                    <p>
                        Про себе:
                        <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{window.sessionStorage.getItem('infoAboutYourself')}
                    </p>

                </section>
            </section>
            <section className='flex flex-grow justify-center p-4  w-[80%]'>
                <CreateFundraiserMenu/>
            </section>
        </main>
    );
};

export default Profile;
