import ProfileCss from './Profile.module.css'

import CollectionCard from "../CollectionCard/CollectionCard";


const Profile = (props) =>{
    return(
    <div className = {ProfileCss.content}>
        <div className={ProfileCss.profile}>
            <p>Гембара Тарас</p>
            <p></p>
        </div>
        <div className={ProfileCss.userCard}>
            <h1>Збори користувача Гембара Тарас</h1>
            <CollectionCard name='Гембара Тарас' nameZbir='На булочку з сосискою'/>
            <CollectionCard name='Гембара Тарас' nameZbir='Продамся в ескорт'/>
            <CollectionCard name='Гембара Тарас' nameZbir='2+2 = матриця, збираю грошИ на матрицю'/>
        </div>
    </div>
    );
};

export default Profile;