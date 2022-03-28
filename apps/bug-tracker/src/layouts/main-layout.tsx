import React from 'react';
import { Layout } from 'antd';
import Sidebar from './sidebar';
import MainHeader from './header';
import BugTrackerRoute from '../routes/routes';
import './layout.scss'

const { Content } = Layout;

const MainLayout=()=>{
  return(
    <Layout style={{ minHeight: '100vh' }}>
      <MainHeader />
      <Layout>
      <Sidebar />
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: "100vh" }}>
            <BugTrackerRoute />
          </div>
        </Content>
      </Layout>
      </Layout>
    </Layout>

  )
}
export default MainLayout

