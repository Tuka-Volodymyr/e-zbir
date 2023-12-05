import React, {useState} from "react";

import MainPageCss from './MainPage.module.css'
import CollectionCard from "../CollectionCard/CollectionCard";
import HeaderCss from "../Header/Header.module.css";
import {NavLink} from "react-router-dom";
// import CollectionCardCss from "../CollectionCard/CollectionCard.module.css";
const MainPage = (props) =>{

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
            <div className={HeaderCss.profile}>
                <NavLink onClick={handleShowMore} to='/zbir'>
                    <button className={MainPageCss.buttonShowMore} onClick={handleShowMore}>Показати ще</button>
                </NavLink>
            </div>
        </div>
    </div>
    );
};

export default MainPage;

