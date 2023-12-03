import {Avatar} from "antd";


import ProfileCss from './Profile.module.css'
import CollectionCard from "../CollectionCard/CollectionCard";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import NewZbir from "./NewZbir/NewZbir.js";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";



const Profile = (props) =>{
    const [checkLogin, setCheckLogin] = useState('')
    const dispatch = useDispatch()
    const isLogin = useSelector(state => state.userInfo)
    const logout = () =>{
        window.localStorage.clear()
        setCheckLogin('logout')
    }
    return(
    <div className = {ProfileCss.content}>
        {checkLogin === 'logout' ? <Navigate to='/'/> : ""}{/*Redirect to checkForm*/}
        <div className={ProfileCss.profile}>
            <div className={ProfileCss.userAvatar}>
                {window.localStorage.getItem('photoUrl') ? (
                    <img src={window.localStorage.getItem('photoUrl')} alt="User Avatar" style={{ width: '256px', height: '256px' }} />
                ) : (
                    <Avatar shape="square" size={256} icon="user" />
                )}
            </div>
            <div className={ProfileCss.userInfo}>
                <p className={ProfileCss.username}>{window.localStorage.getItem('username')}</p>
                <p className={ProfileCss.email}>{window.localStorage.getItem('email')}</p>
            </div>


            <div className={ProfileCss.settings}>
                <ProfileSettings/>
                <div className={ProfileCss.logout}>
                    <img onClick={logout} src="/img/logout.svg" alt=""/>
                </div>
            </div>
        </div>
        <div className={ProfileCss.userCard}>
            <h1>Збори користувача</h1>

            <NewZbir />

            <CollectionCard name='Гембара Тарас' nameZbir='На булочку з сосискою'/>
            <CollectionCard name='Гембара Тарас' nameZbir='Продамся в ескорт'/>
            <CollectionCard name='Гембара Тарас' nameZbir='2+2 = матриця, збираю грошИ на матрицю'/>
        </div>
    </div>
    );
};

export default Profile;