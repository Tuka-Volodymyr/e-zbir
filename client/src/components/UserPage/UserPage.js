import axios from "axios";
import {useSelector} from "react-redux";

import UserPageCss from './UserPage.module.css'
import {useEffect, useState} from "react";

const UserPage = (props) =>{
    const [userInfo, setUserInfo] = useState({})


    const id = useSelector(state => state.userId.id)



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/get?id=${id}`);
                console.log(response); // Перевірте, які поля містить відповідь від сервера
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

        <div>{userInfo.username}</div>
    </div>
    );
};

export default UserPage