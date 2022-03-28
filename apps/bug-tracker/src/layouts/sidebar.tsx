import { Layout, Menu } from 'antd';
import {
  ProjectOutlined,
} from '@ant-design/icons';
import {  useState } from 'react';
import { Link } from 'react-router-dom';


const { Sider } = Layout;

const Sidebar=()=>{
  const [state,setState] =useState({
    collapsed: false,
  });

  const onCollapse = (collapsed:any) => {
    setState({ collapsed });
  };
  const { collapsed } = state;
  return(
    <Sider collapsible style={{overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,}}
           collapsed={collapsed}
           onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<ProjectOutlined />}>

          <Link to={'/'}>Projects
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ProjectOutlined />}>
          <Link to={'/tech-stack'}>Tech-Stacks
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}
export default Sidebar
