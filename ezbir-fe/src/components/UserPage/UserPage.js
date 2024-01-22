import axios from "axios";
import React, {useEffect, useState} from "react";


import './UserPage.module.css';

import UserPageCss from './UserPage.module.css'
import {useParams} from "react-router-dom";
import ProfileCss from "../Profile/Profile.module.css";
import CollectionCard from "../CollectionCard/CollectionCard";

const UserPage = (props) =>{

    const [userInfo, setUserInfo] = useState({})
    const {id} = useParams()

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
        fetchData();
    }, []);

    return(
    <div className = {UserPageCss.content}>
        <div className={UserPageCss.profile}>
            <div className={UserPageCss.userAvatar}>
                <div className={UserPageCss.avatar}>
                    <img className={UserPageCss.avatarImg} src={userInfo.photo} alt=""/>
                </div>
            </div>
            <div className={UserPageCss.userInfo}>
                <p className={UserPageCss.username}>{userInfo.username}</p>
            </div>
        </div>
        <div className={ProfileCss.userCard}>
            <h1>Збори користувача</h1>
            {userInfo.fundraiser ? userInfo.fundraiser.reverse().map((item, index) => (
                <CollectionCard
                    key={index} // Make sure to provide a unique key when rendering a list of components
                    nameZbir={item.name}
                    description={item.description}
                    suma = {item.suma}
                    username = {window.sessionStorage.getItem('username')}
                    userId = {item.id}
                />
            )) : ''}
        </div>
    </div>
    );
};

export default UserPage