import CollectionCardCss from './CollectionCard.module.css'
const CollectionCard = (props) =>{
    return(
    <div className = {CollectionCardCss.content}>
        <div className={CollectionCardCss.block1}>
            <h2 className={CollectionCardCss.nameZbir}>{props.nameZbir}</h2>
            <br/>
            <p className={CollectionCardCss.about}>{props.description}</p>
            <p>Автор: <br/>{props.username}</p>
        </div>
        <div className={CollectionCardCss.block2}>
            <p>Очікувана Сума:</p>
            <p className={CollectionCardCss.sum}>{props.suma}</p>
            <p className={CollectionCardCss.state}>Статус: <strong className={CollectionCardCss.stateColorGreen}>Відкрито</strong> </p>
        </div>

    </div>
    );
};

export default CollectionCard;