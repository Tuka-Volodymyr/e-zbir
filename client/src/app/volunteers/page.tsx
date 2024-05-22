'use client'
import axios from "axios";
import {useEffect, useState} from "react";
import VolunteerCard from "@/components/VolunteerCard";

interface Volunteer {
    fundraiserList: string[],
    infoAboutYourself: string,
    photoUrl: string,
    userId: number,
    username: string,
    views: number
}

const Volunteers: React.FC = (props) =>{

    const [users, setUsers] = useState<Volunteer[]>([])

    useEffect(() => {
        axios.get("http://localhost:8080/user/all")
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return(
        <main>
            <section>
                <input className='w-full border-2 border-black rounded-2xl p-1 mt-3 mb-3'
                       placeholder="Пошук Волонтера"
                       type="search"/>
            </section>
            <section>
                {users.map(user => (
                    <VolunteerCard
                        key={user.userId}
                        username={user.username}
                        photoUrl={user.photoUrl}
                        infoAboutYourself={user.infoAboutYourself}
                        views={user.views}
                        fundraiserList={user.fundraiserList}
                    />
                ))}
            </section>
        </main>
    );
};

export default Volunteers;
