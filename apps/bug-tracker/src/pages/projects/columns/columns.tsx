import { Button, Select, Space, Tag, Typography } from 'antd';
import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';


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
      render: (techStack:[{name:string}]) => {
        let color =['magenta','lime','blue','geekblue','green','purple','cyan','green','']
        if (techStack.length > 0) {
          return techStack.map((tech, index) => {
            return (
              <Tag color={color[index<=color.length-1?index:0]} key={index}>
                {tech.name}
              </Tag>
            );
          });
        } else {
          return <span>{''}</span>;
        }
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
          <Link to={`/bugs`} state={{projectId:record._id}}><Icon icon="ant-design:bug-outlined" color='grey'  fontSize={20} /></Link>
        </Space>
        );
      }
    }
  ];
};
