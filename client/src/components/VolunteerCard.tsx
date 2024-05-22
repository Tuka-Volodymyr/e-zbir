import {Avatar} from "antd";

interface VolunteerCardProps {
    username: string;
    photoUrl: string;
    infoAboutYourself: string;
    views: number;
    fundraiserList: string[];
}
const VolunteerCard: React.FC<VolunteerCardProps> = ({username, photoUrl, infoAboutYourself, views, fundraiserList}) =>{
    return(
        <section className="">
            <Avatar shape="square" size={256} icon={<img src='/img/userIcon.svg' alt="avatar"/>}/>
            <h3>{username}</h3>
            <p>{infoAboutYourself}</p>
            <p>Views: {views}</p>
        </section>
    );
};

export default VolunteerCard;
