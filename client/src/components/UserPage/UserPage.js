import axios from "axios";
import {useSelector} from "react-redux";

import UserPageCss from './UserPage.module.css'

const UserPage = (props) =>{

    const id = useSelector(state => state.userId.id)

    console.log(id)


    axios.get(`http://localhost:8080/user/get?id=${id}`)
        .then(response => {
            console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })

    return(
    <div className = {UserPageCss.content}>
        Hello
    </div>
    );
};

export default UserPage