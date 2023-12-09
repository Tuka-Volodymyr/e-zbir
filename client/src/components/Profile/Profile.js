import ProfileCss from './Profile.module.css'
// import CollectionCard from "../CollectionCard/CollectionCard";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import NewZbir from "./NewZbir/NewZbir.js";
import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import axios from "axios";
import CollectionCard from "../CollectionCard/CollectionCard";
import {message} from "antd";

const Profile = (props) =>{
    const [checkLogin, setCheckLogin] = useState('')
    const [selectedFile, setSelectedFile] = useState(null);
    const [photo, setPhoto] = useState('')

    useEffect(() => {

    }, [checkLogin]);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleUpload = async () => {
        try {
            if (!selectedFile) {
                console.error('Файл не обраний.');
                return;
            }

            const formData = new FormData();
            formData.append('file', selectedFile); // Змінили назву поля на 'file'

            await axios.post('http://localhost:8080/user/add/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${window.sessionStorage.getItem('auth_token')}`,
                },
                withCredentials: true /* Дозволяє передачу сесійних куки */
            })
                .then(response =>{
                    setPhoto(response.data)
                    window.sessionStorage.setItem('photoUrl', response.data)
                    console.log(response)
                })

            console.log('Фото успішно відправлено!');
            message.success('Фото успішно встановлено! Оновіть будь ласка сторінку');
        } catch (error) {
            console.error('Помилка відправлення фото:', error);
        }
    };

    const logout = () =>{
        window.localStorage.clear()
        window.sessionStorage.clear()
        window.sessionStorage.setItem('isLogin', false)
        setCheckLogin('logout')
        console.log(checkLogin)
    }

    return(
        <div className = {ProfileCss.content}>

            {window.sessionStorage.getItem('isLogin') === 'false' ? <Navigate to="/login" /> : ''}{/*Redirect to checkForm*/}

            <div className={ProfileCss.profile}>
                <div className={ProfileCss.userAvatar}>
                    <div className={ProfileCss.avatar}>
                        <img className={ProfileCss.avatarImg} src={photo ? `${photo}` : window.sessionStorage.getItem('photoUrl')} alt=""/>
                        <input className={ProfileCss.inputPhoto} type="file" onChange={handleFileChange} accept="image/*" />
                        <button className={ProfileCss.sendPhoto} onClick={handleUpload}>Відправити фото</button>
                    </div>
                </div>
                <div className={ProfileCss.userInfo}>
                    <p className={ProfileCss.username}>{window.sessionStorage.getItem('username')}</p>
                    <p className={ProfileCss.email}>{window.sessionStorage.getItem('email')}</p>
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
                {window.sessionStorage.getItem('fundraiser') ? JSON.parse(window.sessionStorage.getItem('fundraiser')).reverse().map((item, index) => (
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

export default Profile;