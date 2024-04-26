import Navigation from "@/components/Navigation";

const Header: React.FC = () => {
    return (
        <header className='bg-[#7c7bff] p-[20px] h-[300px] flex flex-col pt-[40px]'>
            <section className='flex-grow flex'>
                <section className='flex'>
                    <img className='w-[23px] h-[38px]' src="/blazon.svg" alt=""/>
                    <h2 className='ml-4 w-[400px]'>Збираємо разом. Рятуємо життя</h2>
                </section>

                <section className='flex-grow'>
                    <h1 className='float-right'>
                    <span className='bg-black text-white text-[56px] pt-2 pb-2 pl-5 pr-5 m-2  rounded-[20px]'>
                        Є
                    </span>
                    <span className='text-[56px] m-2'>
                        Збір
                    </span>
                    </h1>
                </section>
            </section>


            <section className=''>
                <Navigation/>
            </section>
        </header>
    )
}
export default Header;