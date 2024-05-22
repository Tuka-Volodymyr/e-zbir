'use client'

import Link from "next/link";

const Navigation: React.FC = (props) => {
    return (
        <nav className='flex items-center'>
            {/* Навігація по сторінках */}
            <section className="w-2/3">
                <ul className='flex justify-around'>
                    <Link href='/'>Головна</Link>
                    <Link href='/fundraiser'>Збори</Link>
                    <Link href='/volunteers'>Волонтери</Link>
                    <Link href='/about'>Про нас</Link>
                    <Link href='/profile'>Профіль</Link>
                </ul>
            </section>

            {/* Навігація по соц мережах */}
            <section className="w-1/3">
                <ul className='flex justify-around'>
                    <li><img src="/img/fbBlack.svg" alt=""/></li>
                    <li><img src="/img/instagramBlack.svg" alt=""/></li>
                    <li><img src="/img/telegramBlack.svg" alt=""/></li>
                    <li><img src="/img/twitterBlack.svg" alt=""/></li>
                </ul>
            </section>
        </nav>
    );
};

export default Navigation;