import React, { useState } from 'react';
import {Button, Col, Drawer, Form, Input, Row, Select, Space} from 'antd';

import NewZbirCss from './NewZbir.module.css'
import axios from "axios";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

const { Option } = Select;

const NewZbir = (props) =>{

    const [form] = Form.useForm();

    //hook for open/close drawer new zbir
    const [open, setOpen] = useState(false);
    //show new zbir
    const showDrawer = () => {
        setOpen(true);
    };

    //close new zbir
    const onClose = () => {
        setOpen(false);
    };
    //submit new zbir to backend
    const Submit = () => {
        form.validateFields().then(values => {
            setOpen(false)
            //get value from form new zbir
            const formData = form.getFieldsValue();
            console.log(formData)

            axios.post('http://localhost:8080/user/fundraiser/add', {
                name: formData.name,
                suma: formData.suma,
                categories: formData.category,
                cards: [],
                jarLink: formData.jarLink,
                description: formData.description,
            }, {
                headers: {
                    Authorization: `Bearer ${window.sessionStorage.getItem('auth_token')}`,
                },
                withCredentials: true /* Дозволяє передачу сесійних куки */
            })
                .then(response => {
                    window.sessionStorage.setItem('fundraiser',JSON.stringify(response.data))
                })
                .catch(error => {
                    console.log(error);
                });
        }).catch(errorInfo => {
            //error get value from form new zbir
            console.log('Помилка валідації:', errorInfo);
        });
    };



    return(
    <div className = {NewZbirCss.content}>
        <div className={NewZbirCss.position}>
            <Button style={{width:'100%', height:'100%', borderRadius:'10px'}} onClick={showDrawer}>Створити Збір</Button>
            <Drawer
                title="Створення нового збору"
                placement='bottom'
                height={650}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                        fontFamily: 'E-Ukraine',
                        fontWeight: '200',
                        outline: 'none'
                    },
                }}
                extra={
                    <Space>
                        <Button style={{fontFamily:'E-Ukraine', fontWeight:'200', height:'50px', width:'200px', backgroundColor:'#a44646'}} onClick={onClose}type="primary">
                            Скасувати
                        </Button>

                        <Button style={{fontFamily:'E-Ukraine', fontWeight:'200', height:'50px', width:'200px', backgroundColor:'#084A16'}} onClick={Submit} type="primary">
                            Створити
                        </Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
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
                                name="suma"
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
                                label="Категорії"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Оберіть категорію',
                                        type: 'array',
                                    },
                                ]}
                            >
                                <Select mode="multiple" placeholder="Оберіть категорії">
                                    <Option value="Medical_Supplies_Equipment">Медичне обладнання</Option>
                                    <Option value="Support_Military_Forces">Підтримка військових</Option>
                                    <Option value="Psychological_Support">Психологічна підтримка</Option>
                                    <Option value="Education_Training">Навчання</Option>
                                    <Option value=" Emergency_Medical_Assistance">Невідкладна медична допомога</Option>
                                    <Option value="Child_Protection">Захист дітей</Option>
                                    <Option value="Environmental_Safety">Екологія</Option>
                                    <Option value="Cyber_Security">Кібербезпека</Option>
                                    <Option value="Infrastructure_Restoration">Інфраструктура</Option>
                                    <Option value="Housing_Conditions">Житло</Option>
                                    <Option value="Support_Vulnerable_Groups">Підтримка вразливих груп людей</Option>
                                    <Option value="Information_Security">Інформатична безпека</Option>
                                    <Option value="OTHER">Інше</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.List  name="cards">
                                {(fields, { add, remove }) => (
                                    <Form.Item label='Реквізити' style={{marginTop:'0px'}}>
                                        {fields.map(({ key, name, ...restField }, index) => (
                                            <Space
                                                key={key}
                                                style={{
                                                    display: 'flex',
                                                    // alignItems: 'center'
                                                }}

                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'cardType']}
                                                    fieldKey={[name, 'cardType', index]} // Corrected 'fieldKey' here
                                                    rules={[{ required: true, message: 'Оберіть банк' }]}
                                                >
                                                    <Select style={{ width: '200px' }} placeholder="Банк">
                                                        <Option value="mono">Monobank</Option>
                                                        <Option value="private24">Privat24</Option>
                                                        <Option value="pumb">PUMB</Option>
                                                        <Option value="kredo">Kredo Bank</Option>
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'cardNumber']}
                                                    fieldKey={[name, 'cardNumber', index]}
                                                    rules={[{ required: true, message: 'Введіть номер карти' }]}
                                                >
                                                    <Input style={{ width: '450px' }} placeholder="Номер карти" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Додати реквізити
                                            </Button>
                                        </Form.Item>
                                    </Form.Item>
                                )}
                            </Form.List>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="jarLink"
                                label='Лінк на банку'
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