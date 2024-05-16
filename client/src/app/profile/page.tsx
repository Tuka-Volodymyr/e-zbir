'use client'

import CreateFundraiserMenu from "@/components/CreateFundraiserMenu";


const Profile: React.FC = (props) =>{


    return(
        <main className='flex flex-col h-[700px]'>
            <section className='flex-grow p-4'>
                user
            </section>
            <section className='flex flex-grow justify-center p-4'>
                <CreateFundraiserMenu/>
            </section>
        </main>
    );
};

export default Profile;
