import CollectionCardCss from './CollectionCard.module.css'
const CollectionCard = (props) =>{
    return(
    <div className = {CollectionCardCss.content}>
        <h2 className={CollectionCardCss.nameZbir}>{props.nameZbir}</h2>
        <h3>{props.name}</h3>
    </div>
    );
};

export default CollectionCard;