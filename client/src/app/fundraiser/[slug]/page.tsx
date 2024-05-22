'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {FundraiserCategory} from "@/components/FundraiserCard";

interface FundraiserData {
    cards: string[],
    categories: string[],
    description: string,
    fundraiserId: number,
    isClosed: boolean,
    jarLink: string,
    name: string,
    posts: string[],
    suma: number,
    userId: number,
    username: string,
    views: number;
}


const FundraiserPage = ({ params }: { params: { slug: string } }) => {
    const [fundraiser, setFundraiser] = useState<FundraiserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/user/fundraiser/get?id=${params.slug}`)
            .then(response => {
                setFundraiser(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setError("Збір не знайдено");
                setLoading(false);
            });
    }, [params.slug]);

    if (loading) {
        return <main className='flex flex-col items-center'>Loading...</main>;
    }

    if (error) {
        return <main className='flex flex-col items-center'><h2>{error}</h2></main>;
    }

    if (!fundraiser) {
        return <main className='flex flex-col items-center'>No fundraiser found.</main>;
    }

    return (
        <main className='flex flex-col items-center justify-center mt-10 mb-10'>
            <section className='w-[80%] flex '>
                <section className='w-3/4'>
                    <h1>{fundraiser.name}</h1>
                    <br/>
                    <p>
                        Користувач: <br/>
                        <Link href={`/user/${fundraiser.userId}`}>
                            <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fundraiser.username}</strong>
                        </Link>
                    </p>
                    <p>
                        Реквізити: <br/>
                        <ul>
                            {fundraiser.cards.map((el, index) => (
                                <li key={index}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>{el}</strong></li>
                            ))}
                        </ul>
                    </p>
                    <p>
                        Посилання на банку: <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#"><strong>{fundraiser.jarLink? fundraiser.jarLink : "Банка відсутня"}</strong></a>
                    </p>
                    <p>
                        Опис збору: <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>{fundraiser.description}</strong>
                    </p>

                </section>
                <section className='w-1/4 flex flex-col justify-center items-center'>
                    <h2>{fundraiser.suma}₴</h2>
                    <h4>{!fundraiser.isClosed ? <p className='text-green-500'>Збір відкритий</p> :
                        <p className='text-red-400'>Збір закритий</p>}</h4>
                    <p>
                        Перегляди: {fundraiser.views}
                    </p>
                </section>
            </section>
            <section className='flex justify-center mt-4'>
                {fundraiser.categories.slice(0,3).map((category, index) => (
                    <h4 key={index} className="ml-2 mr-2">
                        #{FundraiserCategory[category as keyof typeof FundraiserCategory]}
                    </h4>
                ))}
            </section>
            <section className='mt-10 flex flex-col'>
                <section className='flex justify-center'>
                    <h2>Пости:</h2>
                </section>
                <section className='flex justify-center'>
                    <img className='h-[500] w-[500px]  m-2  border-2 border-black rounded-2xl' src="/shelter1.jpg" alt=""/>
                    <img className='h-[500] w-[500px]  m-2 border-2 border-black rounded-2xl' src="/shelter2.jpg" alt=""/>
                </section>
            </section>


        </main>
    );
};

export default FundraiserPage;
