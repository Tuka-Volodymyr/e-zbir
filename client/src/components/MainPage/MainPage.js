import React, {useState} from "react";
import {NavLink} from "react-router-dom";

import MainPageCss from './MainPage.module.css'
import CollectionCard from "../CollectionCard/CollectionCard";

const MainPage = (props) =>{
    console.log('1')
    const initialCollectionsToShow = 0;
    const[collectionsToShow, setCollectionsToShow] = useState(initialCollectionsToShow);

    const handleShowMore = () => {
        setCollectionsToShow(collectionsToShow + 4);
    };

    return(
    <div className = {MainPageCss.content}>
        <h3 className={MainPageCss.aboutUs}>Про нас</h3>
        <div className={MainPageCss.block}>
            about us про нас
        </div>
        <h3 className={MainPageCss.actualZbir}>
            Актуальні Збори
        </h3>
        <div className={MainPageCss.zbirList}>
            <CollectionCard  key = {1} nameZbir = 'На Хліб' name='Бомж Петро' />
            <CollectionCard  key = {2} nameZbir = 'На Ліки' name='Хворий Володя' />
            <CollectionCard  key = {3} nameZbir = 'На машину' name='Ivan' />
            <CollectionCard  key = {4} nameZbir = 'На Дрон' name='Програміст Коля' />
            <div className={MainPageCss.profile}>
                <NavLink to='/fundraiser'>
                    показати ще
                </NavLink>
            </div>
        </div>
    </div>
    );
};

export default MainPage;

