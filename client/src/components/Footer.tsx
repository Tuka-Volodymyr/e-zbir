const Footer: React.FC = (props) =>{
    return(
        <footer className='bg-black text-white w-full h-[300px] flex flex-col items-center'>
            <section className='flex justify-center mt-10'>
                <img className='m-[7px]' src="/coatOfArms.svg" alt=""/>
                <h1>
                    <span className='bg-white text-black text-[40px] pt-2 pb-2 pl-4 pr-4   rounded-[18px]'>
                        Є
                    </span>
                    <span className='text-[40px]  ml-2'>
                        Збір
                    </span>
                </h1>
            </section>
            <section className='w-[400px] mt-10'>
                <ul className='flex justify-between'>
                    <li><img src="/linkedin.svg" alt=""/></li>
                    <li><img src="/linkedin.svg" alt=""/></li>
                    <li><img src="/linkedin.svg" alt=""/></li>
                    <li><img src="/linkedin.svg" alt=""/></li>
                </ul>
            </section>
        </footer>
    );
};

export default Footer;
