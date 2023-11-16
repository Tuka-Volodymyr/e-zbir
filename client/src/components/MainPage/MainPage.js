
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
        <div className={MainPageCss.collectionCard}>
            <CollectionCard nameZbir = 'На машину' name='Ivan' />
            <CollectionCard nameZbir = 'На Дрон' name='Програміст Коля' />
            <CollectionCard nameZbir = 'На Хліб' name='Бомж Петро' />
            <CollectionCard nameZbir = 'На Ліки' name='Хворий Володя' />
        </div>
    </div>
    );
};

export default MainPage;