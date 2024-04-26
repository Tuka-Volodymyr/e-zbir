'use client'

import Link from "next/link";

const Navigation: React.FC = (props) => {
    return (
        <nav className='flex'>
            {/* Навігація по сторінках */}
            <section className="w-2/3">
                <ul className='flex justify-around'>
                    <Link href='/'>Головна</Link>
                    <Link href='/fundraiser'>Збори</Link>
                    <Link href='/'>Волонтери</Link>
                    <Link href='/about'>Про нас</Link>
                    <Link href='/profile'>Профіль</Link>
                </ul>
            </section>

            {/* Навігація по соц мережах */}
            <section className="w-1/3">
                <ul className='flex justify-around'>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                </ul>
            </section>
        </nav>
    );
};

export default Navigation;