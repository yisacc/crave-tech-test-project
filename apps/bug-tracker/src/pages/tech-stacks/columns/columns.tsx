import { Button, Select, Typography } from 'antd';
import React from 'react';
import { Icon } from '@iconify/react';


export const TechStackColumn = (
  onEditProject:any,
  updating:boolean,
  page:number
) => {
  return [
    {
      title: '#',
      dataIndex: ['_Id'],
      render: (text:any, record:any, rowIndex:any) => (page - 1) * 10 + rowIndex + 1
    },
    {
      title: 'Tech-Stack',
      dataIndex: 'name',
      sorter: (a:any, b:any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text:any, record:any) => {
        return (
          <Button
            key={Math.random()}
            onClick={() => onEditProject(record)}
            type="link"
            className="edit-btn flex items-center justify-left"
          >
            <Icon icon="ant-design:edit-outlined" fontSize={30} color="grey"/>
          </Button>
        );
      }
    }
  ];
};
