import {Avatar} from "antd";


import ProfileCss from './Profile.module.css'
import CollectionCard from "../CollectionCard/CollectionCard";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import NewZbir from "./NewZbir/NewZbir.js";



const Profile = (props) =>{
    return(
    <div className = {ProfileCss.content}>
        <div className={ProfileCss.profile}>
            <div className={ProfileCss.userAvatar}>
                <Avatar shape="square" size={256} icon='G'></Avatar>
            </div>
            <div className={ProfileCss.userInfo}>
                <p className={ProfileCss.username}>{window.localStorage.getItem('username')}</p>
                <p className={ProfileCss.email}>{window.localStorage.getItem('email')}</p>
            </div>

            <div className={ProfileCss.settings}>
                <ProfileSettings/>
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