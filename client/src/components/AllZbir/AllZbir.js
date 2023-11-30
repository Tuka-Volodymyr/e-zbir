import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllZbirCss from './AllZbir.module.css';
import CollectionCard from '../CollectionCard/CollectionCard';

const AllZbir = (props) => {
    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/fundraiser/get/all')
            .then(response => {
                console.log(response.data)
                const data = response.data.map(el => ({
                    username : el.username,
                    nameZbir: el.name,
                    description: el.description,
                    suma : el.suma
                }));
                setItemList(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []); // Empty dependency array ensures this effect runs once on component mount

    return (
        <div className="">
            <h1>Всі збори</h1>
            {itemList.map((item, index) => (
                <CollectionCard
                    key={index} // Make sure to provide a unique key when rendering a list of components
                    nameZbir={item.nameZbir}
                    description={item.description}
                    suma = {item.suma}
                    username = {item.username}
                />
            ))}
        </div>
    );
};

export default AllZbir;
