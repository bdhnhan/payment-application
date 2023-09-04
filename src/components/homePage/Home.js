import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Layout, Form, Input, Image, Slider, InputNumber } from 'antd';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from '../login/Login.js';

const { Header, Content, Footer, Sider } = Layout;


function Home() {
    const [wallet, setWallet] = useState();
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState(false);

    let username = "";
    let balance = "";
    const phoneNumber = "";

    useEffect(() => {

        axios.get('http://localhost:8081/wallet/' + getUserExists())
            .then(function (res) {
                setWallet(res.data.result);
                setLoading(true);
                setLogin(true);
            })
            .catch(function (res) {
                setLoading(true);
                setLogin(false);
            })
    }, []);

    if (login == false && loading) {
        return window.location = "/login";
    }

    if (!loading) {
        console.log("loading");
        return <div>Loading...
        </div>;
    }

    try {
        username = wallet.username;
        balance = wallet.amount;
    } catch (error) {
        return window.location = "/login";
    }

    return (
        <div>
            <Layout>
                <Content style={{ backgroundColor: 'black', display: 'flex', alignItems: 'center', color: 'white', font: 'Fira Sans', fontSize: '35px', height: '50px' }}
                    width={500}>
                    <div style={{ marginLeft: "30px" }}>Payment-Engine</div>
                </Content>
                <Sider style={{ backgroundColor: 'black', display: 'flex', alignItems: 'center', color: 'white', font: 'Fira Sans', fontSize: '20px', justifyContent: 'center' }}
                    width={200}>
                    <div id="username" style={{ visibility: 'visible', marginTop: '15px' }}>{username}</div>
                </Sider>
                <Sider style={{ backgroundColor: 'black', display: 'flex', alignItems: 'center', color: 'white', font: 'Fira Sans', fontSize: '10px', justifyContent: 'center' }}
                    width={70} >
                    <div id='logout' style={{ marginTop: '20px' }} onClick={handleLogOut}>Log Out</div>
                </Sider>
            </Layout>

            <div className='center'>
                <div
                    style={{
                        width: "500px", height: "50px", marginBottom: "20px",
                        marginTop: "40px", marginLeft: "-200px", fontSize: "40px"
                    }}>Chào mừng {username}!</div>

                <Layout
                    style={{
                        width: 650,
                        height: 80,
                        border: "5px solid black",
                        marginBottom: 50,
                        justifyContent: 'center',
                        background: 'white'
                    }}
                >
                    <Sider
                        style={{
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            color: 'black', font: 'Fira Sans', fontSize: '20px', justifyContent: 'left',
                            marginLeft: 20, marginTop: 20
                        }}
                        width={400}
                    >Số dư ví: </Sider>
                    <Sider
                        style={{
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            color: 'black', font: 'Fira Sans', fontSize: '20px', justifyContent: 'left',
                            marginTop: 20,
                            fontWeight: 'bold'
                        }}
                        width={150}
                    >{balance}  ₫</Sider>
                </Layout>
                <Layout>
                    <Sider id='transfer'
                        style={{
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            color: 'black', font: 'Fira Sans', fontSize: '50px', justifyContent: 'center',
                            border: "5px solid black", marginLeft: 10, marginRight: 10
                        }} onClick={handleTransfer}>
                        <div style={{ textAlign: 'center' }}>$</div>
                        <div style={{ fontSize: 20 }}>Chuyển tiền</div>
                    </Sider>
                    <Sider id='topup'
                        style={{
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            color: 'black', font: 'Fira Sans', fontSize: '50px', justifyContent: 'center',
                            border: "5px solid black", marginLeft: 10, marginRight: 10
                        }} onClick={handleTopUp}>
                        <div style={{ textAlign: 'center' }}>💳</div>
                        <div style={{ fontSize: 20 }}>Nạp tiền</div>
                    </Sider>
                    <Sider id='withdraw'
                        style={{
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            color: 'black', font: 'Fira Sans', fontSize: '50px', justifyContent: 'center',
                            border: "5px solid black", marginLeft: 10, marginRight: 10
                        }} onClick={handleWithdraw}>
                        <div style={{ textAlign: 'center' }}>🏦</div>
                        <div style={{ fontSize: 20 }}>Rút tiền</div>
                    </Sider>
                </Layout>
                <div id="form"
                    style={{
                        marginTop: 20,
                        padding: 10
                    }}></div>
            </div>
        </div>

    )
}

function getUserExists() {
    let login = localStorage.getItem('user');
    return login;
}

function handleLogOut() {
    localStorage.removeItem("user");
    window.location = "/login";
}

function handleTransfer() {
    document.getElementById("transfer").style.backgroundColor = '#32ff009c';
    document.getElementById("topup").style.backgroundColor = 'white';
    document.getElementById("withdraw").style.backgroundColor = 'white';
    const root = ReactDOM.createRoot(document.getElementById("form"));
    root.render(
        <div style={{ border: "2px solid black" }}>
            <div style={{ marginLeft: '600px', marginTop: "10px" }}>
                <Button style={{ fontSize: '10px', border: "0px solid black", padding: '4px' }}
                    onClick={cancelAll}
                >❌</Button>
            </div>
            <Form
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}

                initialValues={{
                    remember: true,
                }}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    labelCol={{ style: { width: 200 } }}
                    wrapperCol={{
                        offset: 3,
                        span: 10,
                    }}
                    label="Số điện thoại người nhận"
                    name="phoneReceive"
                    rules={[
                        {
                            required: true,
                            message: 'Please input phone number!',
                        },
                    ]}
                >
                    <InputNumber min={0} style={{ width: "250px" }} controls={false} />
                </Form.Item>

                <Form.Item
                    labelCol={{ style: { width: 200 } }}
                    wrapperCol={{
                        offset: 3,
                        span: 10,
                    }}
                    label="Số tiền cần chuyển"
                    name="amount"
                    rules={[
                        {
                            required: true,

                            message: 'Please input amount!',
                        },
                    ]}
                >
                    <InputNumber min={0} style={{ width: "200px" }} controls={false} />
                </Form.Item>

                <div id="notice" hidden class="centerText">password incorrect</div>

                <Form.Item
                    wrapperCol={{
                        offset: 10,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

function handleTopUp() {
    document.getElementById("topup").style.backgroundColor = '#32ff009c';
    document.getElementById("transfer").style.backgroundColor = 'white';
    document.getElementById("withdraw").style.backgroundColor = 'white';
    const root = ReactDOM.createRoot(document.getElementById("form"));
    root.render(
        <div style={{ border: "2px solid black" }}>
            <div style={{ marginLeft: '600px', marginTop: "10px" }}>
                <Button style={{ fontSize: '10px', border: "0px solid black", padding: '4px' }}
                    onClick={cancelAll}
                >❌</Button>
            </div>
            <Form
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}

                initialValues={{
                    remember: true,
                }}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    labelCol={{ style: { width: 200 } }}
                    wrapperCol={{
                        offset: 3,
                        span: 10,
                    }}
                    label="Số tiền cần nạp"
                    name="amount"
                    rules={[
                        {
                            required: true,

                            message: 'Please input amount!',
                        },
                    ]}
                >
                    <InputNumber min={0} style={{ width: "200px" }} controls={false} />
                </Form.Item>

                <div id="notice" hidden class="centerText">password incorrect</div>

                <Form.Item
                    wrapperCol={{
                        offset: 10,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

function handleWithdraw() {
    document.getElementById("withdraw").style.backgroundColor = '#32ff009c';
    document.getElementById("topup").style.backgroundColor = 'white';
    document.getElementById("transfer").style.backgroundColor = 'white';
    const root = ReactDOM.createRoot(document.getElementById("form"));
    root.render(
        <div style={{ border: "2px solid black" }}>
            <div style={{ marginLeft: '600px', marginTop: "10px" }}>
                <Button style={{ fontSize: '10px', border: "0px solid black", padding: '4px' }}
                    onClick={cancelAll}
                >❌</Button>
            </div>
            <Form
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}

                initialValues={{
                    remember: true,
                }}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    labelCol={{ style: { width: 200 } }}
                    wrapperCol={{
                        offset: 3,
                        span: 10,
                    }}
                    label="Số tiền cần rút"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: 'Please input amount!',
                        },
                    ]}
                >
                    <InputNumber min={0} style={{ width: "200px" }} controls={false} />
                </Form.Item>

                <div id="notice" hidden class="centerText">password incorrect</div>

                <Form.Item
                    wrapperCol={{
                        offset: 10,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

function cancelAll() {
    document.getElementById("withdraw").style.backgroundColor = 'white';
    document.getElementById("topup").style.backgroundColor = 'white';
    document.getElementById("transfer").style.backgroundColor = 'white';
    document.getElementById("form").replaceChildren();
}


export default Home;