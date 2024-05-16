import Link from "next/link";

type OtherAuthProps = {
    value: string,
    link: string
}

const OtherAuth: React.FC<OtherAuthProps> = ({value, link}) =>{
    return(
        <Link href={`${link}`} className='h-[74px] w-[205px] p-[16px] border-black border-2 flex items-center text-[16px] cursor-pointer'>
            <section className="w-2/3">
                {value}
            </section>
            <section className="w-1/4 text-right ml-2">
                →
            </section>
        </Link>
    );
};

export default OtherAuth;
