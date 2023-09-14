import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { LogoutOutlined, UserOutlined, ReloadOutlined, LoadingOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;

const Nav = () => (

    <Layout style={{ backgroundColor: 'white', height: '50px' }}>
        <Content style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', color: 'white', font: 'Segoe UI', fontSize: '35px', height: '50px' }}
            width={500}>
            <div style={{ marginLeft: "30px", color: 'black', fontFamily: 'monospace', fontWeight: 'bolder' }}>Payment Engine</div>
        </Content>
        <Sider style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', color: 'white', font: 'Fira Sans', fontSize: '25px', justifyContent: 'center' }}
            width={200}>
            <div id="username" style={{ visibility: 'visible', marginTop: '11px', color: 'black', fontFamily: 'monospace', fontWeight: 'bolder' }}>
                <UserOutlined style={{ color: "#5ce552" }} />
            </div>
        </Sider>
    </Layout>

)

export default Nav;