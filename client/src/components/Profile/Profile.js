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
        message.error('Image must be smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const Profile = (props) =>{
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });

            // Sending photo to the server using Axios
            const formData = new FormData();
            formData.append('avatar', info.file.originFileObj);

            axios.post('http://localhost:8080/user/add/photo', {
                formData
            }, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
                },
                withCredentials: true /* Дозволяє передачу сесійних куки */
            })

                .then(response => {
                    // Assuming the server responds with the image URL
                    const receivedImageUrl = response.data.imageUrl; // Change 'imageUrl' to the field where the URL is received
                    setImageUrl(receivedImageUrl);
                })
                .catch(error => {
                    console.log(error)
                });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );


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
                        <ImgCrop rotationSlider>
                            <Upload
                                name="avatar"
                                listType="picture"
                                className={ProfileCss.avatarUploader}
                                showUploadList={false}
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                <div className={ProfileCss.block}>
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt="avatar"
                                            style={{
                                                width: '256px',
                                                height: '256px',
                                                borderRadius: "10px",
                                                border: "2px solid #333",
                                            }}
                                        />
                                    ) : (
                                        uploadButton
                                    )}
                                </div>
                            </Upload>
                        </ImgCrop>
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