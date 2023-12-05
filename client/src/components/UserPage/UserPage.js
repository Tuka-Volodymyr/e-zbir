import axios from "axios";
import {useSelector} from "react-redux";
import './UserPage.module.css';

import UserPageCss from './UserPage.module.css'
import {useEffect, useState} from "react";

const UserPage = (props) =>{

    const [userInfo, setUserInfo] = useState({})
    const id = useSelector(state => state.userId.id)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/get?id=${id}`);
                console.log(response);
                setUserInfo({
                    photo: response.data.photoUrl,
                    username: response.data.username,
                    fundraiser: response.data.fundraiserList,
                });
            } catch (error) {
                console.log(error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    return(
    <div className = {UserPageCss.content}>
        <div className={UserPageCss.photo}> Photo{/*Photo: {userInfo.photoUrl}*/}</div>
        <div className={UserPageCss.label}> {userInfo.username}</div>
        <ul className={UserPageCss.fundraiserList}>
            {/*<h3>Збір на медичне обладнання</h3>*/}
            {/*<h3>Збір на їжу</h3>*/}
            {/*<h3>Збір на бронежилети </h3>*/}
        </ul>
    </div>
    );
};

export default UserPage