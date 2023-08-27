import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const Nav = () => (

    <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <div class>Payment-Engine</div>
        </Header>
    </Layout>

)

export default Nav;