import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FundraiserCss from './Fundraiser.module.css';
import CollectionCard from '../CollectionCard/CollectionCard';

const Fundraiser = (props) => {
    const [itemList, setItemList] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/user/fundraiser/get/all')
            .then(response => {
                console.log(response.data)
                const data = response.data.map(el => ({
                    username : el.username,
                    nameZbir: el.name,
                    description: el.description,
                    suma : el.suma,
                    id : el.userId,
                    fundraiserId: el.fundraiserId,
                }));
                setItemList(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []); // Empty dependency array ensures this effect runs once on component mount

    const searchFundraiser = (data, searchText) => {
        if (!data || data.length === 0) {
            return [];
        }
        const lowerSearchText = searchText.toLowerCase();

        if (lowerSearchText.length === 0){
            return data;
        }
        return  data.filter(el => {
            return el.nameZbir.toLowerCase().indexOf(lowerSearchText) > -1;
        });
    }
    const onUpdateSearch = (searchText) => {
        setSearchText(searchText);
    }

    const handleSearchInputChange = (e) => {
        onUpdateSearch(e.target.value);

        axios.post('http://localhost:8080/user/fundraiser/search', {searchText: e.target.value}, {
            headers: {
                Authorization: `Bearer ${window.sessionStorage.getItem('auth_token')}`,
            },
            withCredentials: true /* Дозволяє передачу сесійних куки */
        })
            .then(response => {
                const data = response.data.map(el => ({
                    username: el.username,
                    nameZbir: el.name,
                    description: el.description,
                    suma: el.suma,
                    id: el.userId,
                    fundraiserId: el.fundraiserId,
                }));
                setItemList(data);
            })
            .catch(error => {
                console.log(error);
            });
    };

        return (
        <div className={FundraiserCss.content}>
            <h1>Всі збори</h1>
            <input type="text"
                   className={FundraiserCss.rectangle}
                   placeholder="Введіть текст"
                   value={searchText}
                   onChange={handleSearchInputChange}
            />
            {searchFundraiser(itemList, searchText).map((item, index) => (
                <CollectionCard
                    key={index}
                    nameZbir={item.nameZbir}
                    description={item.description}
                    suma = {item.suma}
                    username = {item.username}
                    userId = {item.id}
                    fundraiserId = {item.fundraiserId}
                />
            ))}
        </div>
    );
};

export default Fundraiser;
