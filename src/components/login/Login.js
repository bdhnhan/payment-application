import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import './Login.css';


const onFinish = (values) => {
    console.log(values);
    axios.post('https://reqres.in/api/login', {
        "email": "eve.holt@reqres.in",
        "password": "cityslicka"
    }).then(function (res) {
        console.log(res.data);
    });
};
// const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
// };

const Login = () => (
    <div className='center'>
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
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

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

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
    </div>
);


export default Login;
