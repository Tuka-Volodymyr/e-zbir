import React, {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import axios from "axios";

import FundraiserItemCss from './FundraiserItem.module.css';
import {Descriptions} from "antd";
import CollectionCard from "../../CollectionCard/CollectionCard";

const FundraiserItem = (props) =>{
    const [fundraiserInfo, setFundraiserInfo] = useState({})
    const {id} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/fundraiser/get?id=${id}`);
                console.log(response);
                setFundraiserInfo({
                    name: response.data.name,
                    suma: response.data.suma,
                    cards: response.data.cards,
                    categories: response.data.categories,
                    username: response.data.username,
                    userId: response.data.userId,
                    isClosed: response.data.isClosed,
                    posts: response.data.posts,
                    description: response.data.description,
                    jarLink: response.data.jarLink,
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

    useEffect(() => {
        console.log(fundraiserInfo)
    }, [fundraiserInfo]);
    return(
    <div className = {FundraiserItemCss.content}>
        <div className={FundraiserItemCss.fundraiserInfo}>
            <div className={FundraiserItemCss.fundraiser_name_status}>
                <div><h2 className={FundraiserItemCss.fundraiserName}>{fundraiserInfo.name}</h2></div>
                <div style={{display:'flex'}}>Статус{fundraiserInfo.isClosed === false ? <p style={{color:'#084A16'}}>: Відкрито</p> : <p style={{color:'#a44646'}}>: Закрито</p>}</div>
            </div>
            <div style={{fontWeight:'100', padding:'5px'}}>
                Автор збору: <NavLink style={{color:'#000', fontWeight:'400'}} to={`/user/${fundraiserInfo.userId}`}>{fundraiserInfo.username}</NavLink>
            </div>
            <div className={FundraiserItemCss.description}>
                <h2>
                    Опис збору:
                </h2>
                <p>
                    {fundraiserInfo.description}
                </p>
            </div>
            <div className={FundraiserItemCss.categoryBlock}>
                <h2>
                    Категорії:
                </h2>
                <div className={FundraiserItemCss.category}>
                    {fundraiserInfo.categories && fundraiserInfo.categories.map((category, index) => (
                        <div className={FundraiserItemCss.categoryItem} key={index}>
                            {category}
                        </div>
                    ))}
                </div>
            </div>
            <div className={FundraiserItemCss.cards}>
                <h2>Реквізити:</h2>
                <div className={FundraiserItemCss.card}>
                    Моно: 4441114423034584
                </div>
                <div className={FundraiserItemCss.card}>
                    Приват: 4441114423034584
                </div>
                <div className={FundraiserItemCss.card}>
                    Ощад: 4441114423034584
                </div>
                <div className={FundraiserItemCss.card}>
                    Лінк на банку: {fundraiserInfo.jarLink || 'instagram.com'}
                </div>
            </div>

            <div className={FundraiserItemCss.sum}>
                <h2>
                    Очікувана сума:
                </h2>
                <div>
                    {fundraiserInfo.suma}
                </div>
            </div>
        </div>
        <div className={FundraiserItemCss.posts}>
            <h2>
                Пости
            </h2>
        </div>
    </div>
    );
};

export default FundraiserItem;