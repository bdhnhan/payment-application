import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Layout, Form, Input, Image, Slider, InputNumber, Card, Tabs } from 'antd';
import { LogoutOutlined, UserOutlined, ReloadOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Login from '../login/Login.js';
import logout from '../../image/logout.png';
import TabPane from 'antd/es/tabs/TabPane.js';


const { Header, Content, Footer, Sider } = Layout;

const submitTransferUser = (values) => {
    axios.post('http://localhost:8083/transfer/transferUser', {
        "requestId": "123",
        "requestedTime": "123",

        "sourceType": "WALLET",
        "sourceId": "ZLP_WALLET",
        "sourceSender": localStorage.getItem("phoneNumber"),

        "destType": "WALLET",
        "destId": "ZLP_WALLET",
        "destReceiver": "0" + values.phoneReceive,

        "promotion": "",
        "amount": values.amount,
        "userId": localStorage.getItem("userId")
    }).then(function (res) {
        console.log(res.data);
        if (res.data.status == 200) {
            waitRefreshBalance(3, res.data.result.transId);
        } else {
        }
    }).catch(function (res) {
        notify('err', res.data);
    });
};

const submitTopUp = (values) => {
    axios.post('http://localhost:8083/transfer/topUp', {
        "requestId": "123",
        "requestedTime": "123",

        "sourceType": "BANK_ACCOUNT",
        "sourceId": "BANK_VCB",
        "sourceSender": localStorage.getItem("userId"),

        "destType": "WALLET",
        "destId": "ZLP_WALLET",
        "destReceiver": localStorage.getItem("phoneNumber"),

        "promotion": "",
        "amount": values.amount,
        "userId": localStorage.getItem("userId")
    }).then(function (res) {
        console.log(res.data);
        if (res.data.status == 200) {
            waitRefreshBalance(3, res.data.result.transId);
        } else {
        }
    }).catch(function (res) {
        console.log("loi topup");
        notify('err', res.data);
    });
};

const submitWithdraw = (values) => {
    axios.post('http://localhost:8083/transfer/withdraw', {
        "requestId": "123",
        "requestedTime": "123",

        "sourceType": "WALLET",
        "sourceId": "ZLP_WALLET",
        "sourceSender": localStorage.getItem("phoneNumber"),

        "destType": "BANK_ACCOUNT",
        "destId": "BANK_VCB",
        "destReceiver": localStorage.getItem("userId"),

        "promotion": "",
        "amount": values.amount,
        "userId": localStorage.getItem("userId")
    }).then(function (res) {
        console.log(res.data);
        if (res.data.status == 200) {
            waitRefreshBalance(3, res.data.result.transId);
        } else {
        }
    }).catch(function (res) {
        notify('err', res.data);
    });
};

const notify = (type, message) => {
    if (type == 'err') {
        toast.error(message);
    } else if (type == 'sucess') {
        toast.success(message);
    }
};

const tabListNoTitle = [
    {
        key: 'transfer',
        label: 'transfer',
    },
    {
        key: 'topup',
        label: 'topup',
    },
    {
        key: 'withdraw',
        label: 'withdraw',
    },
];

const contentListNoTitle = {
    transfer: <div style={{ backgroundColor: "#03ca7738", padding: '50px', borderRadius: '5px', width: '100%', height: '330px' }}>
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
            onFinish={submitTransferUser}
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
    </div>,
    topup: <div style={{ backgroundColor: "#03ca7738", padding: '50px', borderRadius: '5px', width: '100%', height: '330px' }}>
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
            onFinish={submitTopUp}
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
    </div>,
    withdraw: <div style={{ backgroundColor: "#03ca7738", padding: '50px', borderRadius: '5px', width: '100%', height: '330px' }}>
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
            onFinish={submitWithdraw}
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
    </div>,
};

function Home() {
    const [wallet, setWallet] = useState();
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState(false);

    const [activeTabKey1, setActiveTabKey1] = useState('tab1');
    const [activeTabKey2, setActiveTabKey2] = useState('app');
    const onTab1Change = (key) => {
        setActiveTabKey1(key);
    };
    const onTab2Change = (key) => {
        setActiveTabKey2(key);
    };

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
            <ToastContainer position="top-center"
                autoClose={500}
                limit={3}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" />
            <Layout style={{ backgroundColor: 'white', height: '50px' }}>
                <Content style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', color: 'white', font: 'Segoe UI', fontSize: '35px', height: '50px' }}
                    width={500}>
                    <div style={{ marginLeft: "30px", color: 'black', fontFamily: 'monospace', fontWeight: 'bolder' }}>Payment Engine</div>
                </Content>
                <Sider style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', color: 'white', font: 'Fira Sans', fontSize: '25px', justifyContent: 'center' }}
                    width={200}>
                    <div id="username" style={{ visibility: 'visible', marginTop: '11px', color: 'black', fontFamily: 'monospace', fontWeight: 'bolder' }}>
                        <UserOutlined style={{ color: "#5ce552" }} />
                        {username}
                    </div>
                </Sider>
                <Sider style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', color: 'white', font: 'Fira Sans', fontSize: '10px', justifyContent: 'center' }}
                    width={70} >
                    <div id='logout' style={{ marginTop: '18px' }} onClick={handleLogOut}>
                        <LogoutOutlined selected='false' style={{ fontSize: '20px', color: 'black' }} />
                    </div>
                </Sider>
            </Layout>

            <div className='center'>
                <Layout style={{
                    height: '500px',
                    backgroundColor: 'white',
                    border: "5px solid #03ca77",
                    borderRadius: '20px'
                }}>

                    <div
                        style={{
                            width: "500px", height: "50px", margin: "20px", marginBottom: "0px",
                            fontSize: "20px", fontFamily: 'monospace', fontWeight: 'lighter'
                        }}>Chào mừng <b style={{ fontSize: '25px', color: '#ff0000ab' }}>{username}!</b>
                    </div>

                    <Layout
                        style={{
                            width: 650,
                            paddingBottom: "10px",
                            alignItems: 'center',
                            background: 'white',
                            justifyContent: 'center',
                            paddingLeft: '100px'
                        }}
                    >
                        <Sider
                            style={{
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                color: 'black', fontSize: '20px',
                                justifyContent: 'left', fontWeight: 'bolder',
                                marginLeft: 20, fontFamily: 'monospace', fontWeight: 'bold'
                            }}
                            width={120}
                        >Số dư ví: </Sider>

                        <Sider
                            id='reloadBalance'
                            style={{
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                color: 'black', font: 'Fira Sans', fontSize: '20px', justifyContent: 'left',
                                fontWeight: 'bold',
                            }}
                            width={50}
                            onClick={handleReloadBalance}
                        >
                            <ReloadOutlined
                                style={{
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: 'black', font: 'Fira Sans', fontSize: '25px', justifyContent: 'left',
                                    fontWeight: 'bold',
                                }}
                            />
                        </Sider>

                        <Sider
                            id='balance'
                            style={{
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                color: 'black', font: 'Fira Sans', fontSize: '20px', justifyContent: 'left',
                                fontWeight: 'bold',
                            }}
                            width={250}
                        >{balance} ₫
                        </Sider>
                    </Layout>
                    <Layout
                        style={{
                            width: 650,
                            height: 250,
                            marginBottom: "110px",
                            background: 'white',
                            borderTop: "5px solid #03ca77",
                            borderRadius: '50px'

                        }}>
                        <Tabs centered='center' type="card" tabPosition='top'
                            defaultActiveKey="1" size='large' tabBarGutter={80}
                            tabBarStyle={{
                                marginBottom: '0px',
                                fontWeight: 'bolder',
                                color: '#03ca77',
                                lightingColor: 'red'

                            }}
                            tabIndex={{
                                backgroundColor: 'black'
                            }}>
                            <TabPane tab="Chuyển tiền" key="1">
                                {contentListNoTitle['transfer']}
                            </TabPane>
                            <TabPane tab="Nạp tiền" key="2">
                                {contentListNoTitle['topup']}
                            </TabPane>
                            <TabPane tab="Rút tiền" key="3">
                                {contentListNoTitle['withdraw']}
                            </TabPane>
                        </Tabs>
                    </Layout>
                </Layout>
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

async function waitRefreshBalance(dem, transId) {
    console.log("waitRefreshBalance dem = " + dem);
    if (dem == 3) {
        let reloadBalance = ReactDOM.createRoot(document.getElementById("reloadBalance"));
        reloadBalance.render(
            <LoadingOutlined
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'black', font: 'Fira Sans', fontSize: '25px', justifyContent: 'left',
                    fontWeight: 'bold',
                }}
            />
        )
    }
    if (dem != 0) {
        axios.get('http://localhost:8083/transfer/status/' + transId
        ).then(function (res) {
            if (res.data.status == 200) {
                if (res.data.result == 'COMPLETED') {
                    refreshBalance();
                    notify('sucess', res.data.result);
                } else if (res.data.result != 'FAILED') {
                    setTimeout(function () {
                        waitRefreshBalance(dem - 1, transId);
                    }, 3000);
                } else if (res.data.result == 'FAILED') {
                    notify('err', res.data.result);
                    let reloadBalance = ReactDOM.createRoot(document.getElementById("reloadBalance"));
                    reloadBalance.render(
                        <ReloadOutlined
                            style={{
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                color: 'black', font: 'Fira Sans', fontSize: '25px', justifyContent: 'left',
                                fontWeight: 'bold'
                            }}
                        />
                    )
                }
            }
        }).catch(function (res) {
            notify('err', res.data);
            let reloadBalance = ReactDOM.createRoot(document.getElementById("reloadBalance"));
            reloadBalance.render(
                <ReloadOutlined
                    style={{
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'black', font: 'Fira Sans', fontSize: '25px', justifyContent: 'left',
                        fontWeight: 'bold'
                    }}
                />
            )
        });
    }
}

function refreshBalance() {
    console.log("refresh balance");
    axios.get('http://localhost:8081/wallet/' + localStorage.getItem("phoneNumber"))
        .then(function (res) {
            let amount = res.data.result.amount;
            document.getElementById("balance").innerHTML = "<div class='ant-layout-sider-children'>" + amount + "  ₫</div>";
            let reloadBalance = ReactDOM.createRoot(document.getElementById("reloadBalance"));
            reloadBalance.render(
                <ReloadOutlined
                    style={{
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'black', font: 'Fira Sans', fontSize: '25px', justifyContent: 'left',
                        fontWeight: 'bold'
                    }}
                />
            )
        })
}

function handleReloadBalance() {
    console.log("reload balance");
    let reloadBalance = ReactDOM.createRoot(document.getElementById("reloadBalance"));
    reloadBalance.render(
        <LoadingOutlined
            style={{
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                color: 'black', font: 'Fira Sans', fontSize: '25px', justifyContent: 'left',
                fontWeight: 'bold',
            }}
        />
    )
    axios.get('http://localhost:8081/wallet/' + localStorage.getItem("phoneNumber"))
        .then(function (res) {
            console.log("api get xong");
            let amount = res.data.result.amount;
            document.getElementById("balance").innerHTML = "<div class='ant-layout-sider-children'>" + amount + "  ₫</div>";
            reloadBalance.render(
                <ReloadOutlined
                    style={{
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'black', font: 'Fira Sans', fontSize: '25px', justifyContent: 'left',
                        fontWeight: 'bold'
                    }}
                />
            )
        })
}

export default Home;