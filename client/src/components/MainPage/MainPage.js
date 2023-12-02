import React, {useState} from "react";

import MainPageCss from './MainPage.module.css'
import CollectionCard from "../CollectionCard/CollectionCard";
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
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dicta est odit quas qui veniam vitae. Harum labore, totam! Amet aperiam assumenda autem delectus dolores fugit molestias nam, natus veritatis!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dicta est odit quas qui veniam vitae. Harum labore, totam! Amet aperiam assumenda autem delectus dolores fugit molestias nam, natus veritatis!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dicta est odit quas qui veniam vitae. Harum labore, totam! Amet aperiam assumenda autem delectus dolores fugit molestias nam, natus veritatis!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dicta est odit quas qui veniam vitae. Harum labore, totam! Amet aperiam assumenda autem delectus dolores fugit molestias nam, natus veritatis!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dicta est odit quas qui veniam vitae. Harum labore, totam! Amet aperiam assumenda autem delectus dolores fugit molestias nam, natus veritatis!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dicta est odit quas qui veniam vitae. Harum labore, totam! Amet aperiam assumenda autem delectus dolores fugit molestias nam, natus veritatis!</p>
        </div>
        <h3 className={MainPageCss.actualZbir}>
            Актуальні Збори
        </h3>
        <div className={MainPageCss.zbirList}>
            <CollectionCard  key = {1} nameZbir = 'На Хліб' name='Бомж Петро' />
            <CollectionCard  key = {2} nameZbir = 'На Ліки' name='Хворий Володя' />
            <CollectionCard  key = {3} nameZbir = 'На машину' name='Ivan' />
            <CollectionCard  key = {4} nameZbir = 'На Дрон' name='Програміст Коля' />

            {[...Array(collectionsToShow)].map((_,index) =>(
                <CollectionCard key={index} nameZbir = {`Збір ${index+1}`} name={`Волонтер ${index+1}`}></CollectionCard>
            ))}

            <button className={MainPageCss.buttonShowMore} onClick={handleShowMore}>Показати ще</button>
        </div>
    </div>
    );
};

export default MainPage;

