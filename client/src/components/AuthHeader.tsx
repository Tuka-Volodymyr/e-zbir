import Link from "next/link";

const AuthHeader: React.FC = (props) =>{
    return(
        <header className='w-3/4 bg-white p-7 border-b border-black'>
            <section className='flex-grow flex items-center'>
                <Link className='flex ml-4 w-[400px]' href='/'>
                    <h6 className=' hover:border-b hover:border-black'>← Повернутись на сайт</h6>
                </Link>

                <section className='flex-grow'>
                    <h1 className='float-right flex items-center'>
                    <span className='bg-black text-white text-[36px] pt-3 pb-3 pl-3 pr-3   rounded-[18px]'>
                        Є
                    </span>
                        <span className='text-[36px] m-2'>
                        Збір
                    </span>
                    </h1>
                </section>
            </section>
        </header>
    );
};

export default AuthHeader;
