import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const Nav = () => (

    <Layout>
        <Header style={{backgroundColor: 'black', display: 'flex', alignItems: 'center', color: 'white', font: 'Fira Sans', fontSize: '40px' }}>
            <div className="demo-logo" />
            <div class>Payment-Engine</div>
            <div id = "username" hidden></div>
        </Header>
    </Layout>

)

export default Nav;