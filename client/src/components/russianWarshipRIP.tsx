'use client'
import { useEffect, useState } from "react";
import axios from "axios";

interface Stats {
    aa_warfare_systems: number;
    armoured_fighting_vehicles: number;
    artillery_systems: number;
    atgm_srbm_systems: number;
    cruise_missiles: number;
    helicopters: number;
    mlrs: number;
    personnel_units: number;
    planes: number;
    special_military_equip: number;
    submarines: number;
    tanks: number;
    uav_systems: number;
    vehicles_fuel_tanks: number;
    warships_cutters: number;
    date: string;
}

const RussianWarshipRIP: React.FC = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const [date, setDate] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('https://russianwarship.rip/api/v1/statistics/latest')
            .then(response => {
                setStats(response.data.data.stats);
                setDate(response.data.data.date)
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!stats) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <section className='flex justify-center m-20'>
                <section className='w-[80%] flex justify-center items-center'>
                    <section className='w-[50%]'>
                        <h1>Втрати росії <br/> станом на <br/>{date}</h1>
                    </section>
                    <section className='bg-[#B0B8A9] flex flex-col justify-center items-center h-[500px] rounded-3xl'>
                        <section className='m-7'>
                            <h2>Особовий склад:{stats.personnel_units}</h2>
                        </section>
                        <section className='flex m-5 justify-center items-center'>
                            <section className='m-3'>
                                <h2>Бойові машини: <p className='block text-8xl'>{stats.armoured_fighting_vehicles}</p>
                                </h2>
                            </section>
                            <section className='m-3'>
                                <h2>Літаки: <br/> <p className='block text-8xl'>{stats.planes}</p></h2>

                            </section>
                        </section>


                    </section>
                </section>
            </section>
        </>
    );
};

export default RussianWarshipRIP;
