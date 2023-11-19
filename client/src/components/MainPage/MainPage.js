import React from "react";

import MainPageCss from './MainPage.module.css'
import CollectionCard from "../CollectionCard/CollectionCard";
const MainPage = (props) =>{
    return(
    <div className = "">
        <div className={MainPageCss.search}>
            <input placeholder='Назва збору, імʼя волонтера || На машину, Іван Петрович' type="search"/>
            <img src="/img/search.svg" alt=""/>
        </div>
        <h3 className={MainPageCss.actualZbir}>
            Актуальні Збори
        </h3>
        <div className={MainPageCss.container}>
            {/*UpperCards*/}
            <div className={MainPageCss.UpCards}>
                <CollectionCard nameZbir = 'На Хліб' name='Бомж Петро' />
                <CollectionCard nameZbir = 'На Ліки' name='Хворий Володя' />
            </div>
            {/*DownCards*/}
            <div className={MainPageCss.DownCards}>
                <CollectionCard nameZbir = 'На машину' name='Ivan' />
                <CollectionCard nameZbir = 'На Дрон' name='Програміст Коля' />
            </div>
        </div>
    </div>
    );
};

export default MainPage;