'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "antd";
import FundraiserCard from "@/components/FundraiserCard";

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

interface UserPageData {
    fundraiserList: Fundraiser[];
    infoAboutYourself: string;
    photoUrl: string;
    userId: number;
    username: string;
    views: number;
}

const UserPage = ({ params }: { params: { slug: string } }) => {
    const [userData, setUserData] = useState<UserPageData | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/user/get?id=${params.slug}`)
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [params.slug]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <main className='flex flex-col items-center'>
            <section className='flex flex-grow p-4 w-[80%] mt-4'>
                <section className='bg-gray-300 rounded'>
                    <Avatar shape="square" size={256} src={userData.photoUrl || '/img/userIcon.svg'} />
                </section>
                <section className='flex flex-col pl-4'>
                    <p>
                        Імʼя:
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userData.username}
                    </p>
                    <br />
                    <br />
                    <p>
                        Про себе:
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userData.infoAboutYourself || 'Немає інформації'}
                    </p>
                </section>
            </section>
            <section className='flex flex-col flex-grow items-center p-4 w-full'>
                <h2>Збори користувача:</h2>
                <ul className='w-[80%]'>
                    {userData.fundraiserList.map((fundraiser) => (
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

export default UserPage;
