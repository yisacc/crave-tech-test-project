import { Button, Select, Space, Tag, Typography } from 'antd';
import React from 'react';
import { Icon } from '@iconify/react';

const { Option } = Select;
const { Title } = Typography;

export const ProjectColumn = (
  onEditProject:any,
  updating:any,
  page:any
) => {
  return [
    {
      title: '#',
      dataIndex: ['_id'],
      render: (text:any, record:any, rowIndex:any) => (page - 1) * 10 + rowIndex + 1
    },
    {
      title: 'Project',
      dataIndex: 'name',
      sorter: (a:any, b:any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Tech Stack',
      dataIndex: 'techStack',
      render: (techStack:{name:string}) => {

          let color = techStack.name.length > 5 ? 'geekblue' : 'green';

          return (
          <Tag color={color} key={Math.random()}>
            {techStack.name}
          </Tag>
          );
      },
      sorter: (a:any, b:any) => a.techStack.name.localeCompare(b.techStack.name),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text:any, record:any) => {
        return (
        <Space size='middle'>
          <Icon icon="ant-design:edit-outlined" fontSize={30} color="grey" onClick={() => onEditProject(record)}/>
          <Icon icon="ant-design:bug-outlined" color='grey'  fontSize={20} />
        </Space>
        );
      }
    }
  ];
};
