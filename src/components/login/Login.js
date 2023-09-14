import React from 'react';
import { Button, Checkbox, Form, Input, Image } from 'antd';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import './Login.css';
import banner from '../../image/banner.png'
import Home from '../homePage/Home.js'
import Nav from '../Header'
import { Navigate, Route, Routes } from 'react-router-dom';


// const onFinish = async (values) => {
//     console.log(values);
//     await axios.post('http://localhost:8080/user/login', {
//         "username": values.username,
//         "password": values.password
//     }).then(function (res) {
//         console.log(res.data);
//         if (res.data.status == 200) {
//             if ('caches' in window) {
//                 caches.open('user').then((cache) => {
//                     cache.put('user', new Response(JSON.stringify(values.username)));
//                 })
//             }
//             // const root = ReactDOM.createRoot(document.getElementById('root'));
//             // root.render(
//             //     <React.StrictMode>
//             //         <Home />
//             //     </React.StrictMode>
//             // );
//             console.log("nav");
//             return <Navigate replace to="/" />
//         } else {
//             document.getElementById('notice').hidden = false;
//         }
//     });
// };
// const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
// };

function Login() {

    const onFinish = (values) => {
        console.log(values);
        axios.post('http://localhost:8080/user/login', {
            "username": values.username,
            "password": values.password
        }).then(function (res) {
            console.log(res.data);
            if (res.data.status == 200) {
                console.log(res.data.result);
                localStorage.setItem("user", values.username);
                localStorage.setItem("phoneNumber", res.data.result.phoneNumber);
                localStorage.setItem("userId", res.data.result.id);
                window.location = "/home"
            } else {
                document.getElementById('notice').hidden = false;
            }
        });
    };

    if (localStorage.getItem("user") != null) {
        return <Navigate to="/home"/>
    }

    return (
        <div className='App'>
            <Nav />
            <Image
                width={"1920"}
                src={banner}
                style={{ marginBottom: "10px", alignContent: 'center' }}
            />
            <Form
                className='center'
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 300,
                    textAlign: 'center',
                    marginTop: '170px'
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <div id="notice" hidden class="centerText">password incorrect</div>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            <Routes>
                <Route path='/home' element={<Home />} />
            </Routes>
        </div>
    );
};


export default Login;
