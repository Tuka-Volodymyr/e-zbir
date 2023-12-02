import CollectionCardCss from './CollectionCard.module.css'
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
const CollectionCard = (props) =>{

    const dispatch = useDispatch();

    const setId = () =>{
        dispatch({type:'SET_USER_ID', payload: props.userId})
    }



    return(
    <div className = {CollectionCardCss.content}>
        <div className={CollectionCardCss.block1}>
            <h2 className={CollectionCardCss.nameZbir}>{props.nameZbir}</h2>
            <br/>
            <p className={CollectionCardCss.about}>{props.description}</p>
            <p>Автор: <br/>  <NavLink onClick={setId} to={`/user/${props.userId}`}>{props.username}</NavLink></p>
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