import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FundraiserCss from './Fundraiser.module.css';
import CollectionCard from '../CollectionCard/CollectionCard';

const Fundraiser = (props) => {
    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/fundraiser/get/all')
            .then(response => {
                console.log(response.data)
                const data = response.data.map(el => ({
                    username : el.username,
                    nameZbir: el.name,
                    description: el.description,
                    suma : el.suma,
                    id : el.userId
                }));
                setItemList(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []); // Empty dependency array ensures this effect runs once on component mount

    return (
        <div className={FundraiserCss.content}>
            <h1>Всі збори</h1>
            {itemList.map((item, index) => (
                <CollectionCard
                    key={index} // Make sure to provide a unique key when rendering a list of components
                    nameZbir={item.nameZbir}
                    description={item.description}
                    suma = {item.suma}
                    username = {item.username}
                    userId = {item.id}
                />
            ))}
        </div>
    );
};

export default Fundraiser;
