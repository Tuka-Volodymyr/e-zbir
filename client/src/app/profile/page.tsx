'use client'

import CreateFundraiserMenu from "@/components/CreateFundraiserMenu";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import FundraiserCard from "@/components/FundraiserCard";
import SettingMenu from "@/components/SettingMenu";

interface Fundraiser {
    cards: string[]
    categories: string[]
    description: string
    isClosed: boolean;
    jarLink: string;
    posts: string[];
    suma: number;
    userId: number,
    fundraiserId: number,
    username: string,
    name: string,
    views: number
}
const Profile: React.FC = (props) =>{
    const router = useRouter();

    useEffect(() => {
        const token:string | null = sessionStorage.getItem('auth_token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    const fundraisersData = JSON.parse(sessionStorage.getItem('fundraiser') || '[]');

    return(
        <main className='flex flex-col  items-center'>
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
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{window.sessionStorage.getItem('infoAboutYourself') == null? window.sessionStorage.getItem('infoAboutYourself') : 'Немає інформації'}
                    </p>

                </section>
                <SettingMenu/>
            </section>
            <section className='flex flex-col flex-grow items-center p-4  w-[80%]'>
                <CreateFundraiserMenu/>
                <ul className='w-full'>
                    {fundraisersData.map((fundraiser:Fundraiser) => (
                        <li className='border-2 border-black w-full h-[270px] mt-3 mb-3 p-2' key={fundraiser.fundraiserId}>
                            <FundraiserCard
                                cards={fundraiser.cards}
                                categories={fundraiser.categories}
                                description={fundraiser.description}
                                isClosed={fundraiser.isClosed}
                                jarLink={fundraiser.jarLink}
                                name={fundraiser.name}
                                posts={fundraiser.posts}
                                suma={fundraiser.suma}
                                userId={fundraiser.userId}
                                fundraiserId={fundraiser.fundraiserId}
                                username={fundraiser.username}
                                views={fundraiser.views}
                            />
                        </li>
                    ))}
                </ul>

            </section>
        </main>
    );
};

export default Profile;
