'use client'

import {FormEvent, useState} from "react";
import {Button, Drawer, DrawerProps, Space} from "antd";
import FundraiserForm from "@/components/FundraiserForm";
import axios from "axios";

const CreateFundraiserMenu: React.FC = (props) =>{
    const [open, setOpen] = useState(false);


    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const hundleSubmit = (e: FormEvent<HTMLFormElement>, data:any) => {
        e.preventDefault()
        axios.post('http://localhost:8080/user/fundraiser/add', data, {
            headers: {
                Authorization: `Bearer ${window.sessionStorage.getItem('auth_token')}`,
            },
            withCredentials: true
        })
            .then(response =>{
                console.log(response)
            })
            .catch(error =>{
                console.log(error)
            })

    };
    return(
        <>
            <button onClick={showDrawer} className='border-2 border-black w-full h-[144px]'>
                Створити новий збір
            </button>
            <Drawer
                title="Новий Збір"
                placement='bottom'
                closable={false}
                size='large'
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <button onClick={onClose} className="border border-red-500 hover:border-red-600 text-red-500 py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                            Скасувати
                        </button>
                        <button className="border border-green-500 hover:border-green-600 text-green-500 py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" type='submit' form='fundraiserForm'>
                            Створити
                        </button>
                    </Space>
                }
            >
                <FundraiserForm id='fundraiserForm' submit={hundleSubmit}/>
            </Drawer>
        </>
    );
};

export default CreateFundraiserMenu;
