import { Button, Select, Typography } from 'antd';
import React from 'react';
import { Icon } from '@iconify/react';

const { Option } = Select;
const { Title } = Typography;

export const ProjectColumn = (
  onEditProject:any,
  updating:any,
  updatedIndex:any,
  page:any
) => {
  return [
    {
      title: '#',
      dataIndex: ['_Id'],
      render: (text:any, record:any, rowIndex:any) => (page - 1) * 10 + rowIndex + 1
    },
    {
      title: 'Project',
      dataIndex: 'name',
      sorter: (a:any, b:any) => a.Name.localeCompare(b.Name),
    },
    {
      title: 'Tech Stack',
      dataIndex: 'techStack',
      render: (techStack:{name:string}) => {
        return <span>{techStack?.name || '-'}</span>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text:any, record:any, index:any) => {
        return (
          <Button
            key={index}
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
