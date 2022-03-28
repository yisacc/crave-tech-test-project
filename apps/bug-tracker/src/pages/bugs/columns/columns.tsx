import { Button, Select, Space, Tag, Typography } from 'antd';
import React from 'react';
import { Icon } from '@iconify/react';


export const BugColumn = (
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
      title: 'Title',
      dataIndex: 'title',
      sorter: (a:any, b:any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      sorter: (a:any, b:any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text:any, record:any) => {
        return (
        <Space size='middle'>
          <Icon icon="ant-design:edit-outlined" fontSize={30} color="grey" onClick={() => onEditProject(record)}/>
        </Space>
        );
      }
    }
  ];
};
