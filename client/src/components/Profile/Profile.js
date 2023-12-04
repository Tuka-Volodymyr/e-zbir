import {Avatar, message, Upload} from "antd";
import ImgCrop from 'antd-img-crop';

import ProfileCss from './Profile.module.css'
import CollectionCard from "../CollectionCard/CollectionCard";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import NewZbir from "./NewZbir/NewZbir.js";
import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import axios from "axios";

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const Profile = (props) =>{
    const [selectedFile, setSelectedFile] = useState(null);

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
                    console.log(response);
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
                    {/*<Avatar shape="square" size={256} icon='G'></Avatar>*/}
                    <div className={ProfileCss.avatar}>
                        {/*<ImgCrop rotationSlider>*/}
                        {/*    <Upload*/}
                        {/*        name="avatar"*/}
                        {/*        listType="picture"*/}
                        {/*        className={ProfileCss.avatarUploader}*/}
                        {/*        showUploadList={false}*/}
                        {/*        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"*/}
                        {/*        beforeUpload={beforeUpload}*/}
                        {/*        onChange={handleChange}*/}
                        {/*    >*/}
                        {/*        <div className={ProfileCss.block}>*/}
                        {/*            {imageUrls ? (*/}
                        {/*                <img*/}
                        {/*                    src={imageUrls}*/}
                        {/*                    alt="avatar"*/}
                        {/*                    style={{*/}
                        {/*                        width: '256px',*/}
                        {/*                        height: '256px',*/}
                        {/*                        borderRadius: "10px",*/}
                        {/*                        border: "2px solid #333",*/}
                        {/*                    }}*/}
                        {/*                />*/}
                        {/*            ) : (*/}
                        {/*                uploadButton*/}
                        {/*            )}*/}
                        {/*        </div>*/}
                        {/*    </Upload>*/}
                        {/*</ImgCrop>*/}
                        <div>
                            <input type="file" onChange={handleFileChange} accept="image/*" />
                            <button onClick={handleUpload}>Відправити фото</button>
                        </div>

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