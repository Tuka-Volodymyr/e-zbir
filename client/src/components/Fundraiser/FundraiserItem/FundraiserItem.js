import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const FundraiserItem = (props) =>{
    const [userInfo, setUserInfo] = useState({})
    const {id} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/fundraiser/get?id=${id}`);
                console.log(response);
                setUserInfo({
                    photo: response.data.photoUrl,
                    username: response.data.username,
                    fundraiser: response.data.fundraiserList,
                }, {
                    headers: {
                        Authorization: `Bearer ${window.sessionStorage.getItem('auth_token')}`,
                    },
                    withCredentials: true /* Дозволяє передачу сесійних куки */
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return(
    <div className = "">

    </div>
    );
};

export default FundraiserItem;