import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';

import NewZbirCss from './NewZbir.module.css'

const { Option } = Select;

const NewZbir = (props) =>{
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return(
    <div className = {NewZbirCss.content}>
        <div className={NewZbirCss.position}>
            <Button style={{width:'100%', height:'100%', borderRadius:'10px'}} onClick={showDrawer}>Створити Збір</Button>
            <Drawer
                title="Створення нового збору"
                placement='bottom'
                height={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Скасувати</Button>
                        <Button onClick={onClose} type="primary">
                            Створити
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="nameZbir"
                                label="Назва збору"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Напишіть назву збору',
                                    },
                                ]}
                            >
                                <Input placeholder="На Ак-47" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="sumZbir"
                                label="Сума збору"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Введіть потрібну суму',
                                    },
                                ]}
                            >
                                <Input placeholder="123 456"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="category"
                                label="Категорія"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Виберіть категорію',
                                    },
                                ]}
                            >
                                <Select placeholder="Оберіть категорію">
                                    <Option value="1">Медикаменти</Option>
                                    <Option value="2">Гуманітарка</Option>
                                    <Option value="3">Машина</Option>
                                    <Option value="4">Спеціальне обладнання</Option>
                                    <Option value="5">Інше</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="card"
                                label="Номер банківської карти"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Введіть номер банківськох карти',
                                    },
                                ]}
                            >
                                <Input placeholder="1234 5678 9012 3456"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="mono"
                                label='Моно банка'
                            >
                                <Input
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="https://send.monobank.ua/jar/НаБулочку"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Опис Збору"
                                rules={[
                                    {
                                        required: true,
                                        message: 'please enter url description',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="Збираю на булочку з сосискою і чай з бутербродиком, приймаю любу валюту крім рублів, їх прийму хіба що як туалетний папір. Дякую!!!" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </div>
    </div>
    );
};

export default NewZbir;