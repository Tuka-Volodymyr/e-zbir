import CollectionCardCss from './CollectionCard.module.css'
const CollectionCard = (props) =>{
    return(
    <div className = {CollectionCardCss.content}>
        <div className={CollectionCardCss.block1}>
            <h2 className={CollectionCardCss.nameZbir}>{props.nameZbir}</h2>
            <br/>
            <p className={CollectionCardCss.about}>Студенти ЛДУБЖД хочуть їсти, вони голодні, тому я збираю гроші на пиво з сухариками, приймаємо Євро і Доляри, можна ще злоті, але багато</p>
           <br/>
            <p>Автор: <br/> {props.name}</p>
        </div>
        <div className={CollectionCardCss.block2}>
            <p>Очікувана Сума:</p>
            <p className={CollectionCardCss.sum}>123 456</p>
            <p className={CollectionCardCss.state}>Статус: <strong className={CollectionCardCss.stateColorGreen}>Відкрито</strong> </p>
        </div>

    </div>
    );
};

export default CollectionCard;