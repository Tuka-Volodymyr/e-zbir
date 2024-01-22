import {NavLink} from "react-router-dom";

import CollectionCardCss from './CollectionCard.module.css'

const CollectionCard = (props) =>{
    return(
    <div className = {CollectionCardCss.content}>
        <div className={CollectionCardCss.block1}>
            <h2 ><NavLink className={CollectionCardCss.nameZbir} to={`/fundraiser/${props.fundraiserId}`}> {props.nameZbir}</NavLink></h2>
            <br/>
            <p className={CollectionCardCss.about}>{props.description}</p>
            <br/>
            <p>Реквізити: 444114423034538</p>
            <p>Автор: <NavLink to={`/user/${props.userId}`}>{props.username}</NavLink></p>
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