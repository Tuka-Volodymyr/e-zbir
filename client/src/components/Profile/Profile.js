import ProfileCss from './Profile.module.css'
import CollectionCard from "../CollectionCard/CollectionCard";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import NewZbir from "./NewZbir/NewZbir.js";
import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import axios from "axios";

const Profile = (props) =>{
    const [selectedFile, setSelectedFile] = useState(null);
    const [photo, setPhoto] = useState('')
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
                    Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
                },
                withCredentials: true /* Дозволяє передачу сесійних куки */
            })
                .then(response =>{
                    setPhoto(response.data.photoUrl)
                    console.log(response)

                })

            console.log('Фото успішно відправлено!');
        } catch (error) {
            console.error('Помилка відправлення фото:', error);
        }
    };

    const [checkLogin, setCheckLogin] = useState('')
    const logout = () =>{
        window.localStorage.clear()
        setCheckLogin('logout')
    }

    return(
        <div className = {ProfileCss.content}>

            {checkLogin === 'logout' ? <Navigate to='/login'/> : ""}{/*Redirect to checkForm*/}

            <div className={ProfileCss.profile}>
                <div className={ProfileCss.userAvatar}>
                    <div className={ProfileCss.avatar}>

                        <div>
                            <input type="file" onChange={handleFileChange} accept="image/*" />
                            <button onClick={handleUpload}>Відправити фото</button>
                        </div>
                        <img src='' alt=""/>
                    </div>
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

            </div>
        </div>
    );
};

export default Profile;