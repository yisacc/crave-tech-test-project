import { Select, Space, Typography } from 'antd';
import React from 'react';
import { Icon } from '@iconify/react';
import './columns.scss'

const { Option } = Select;
const { Title } = Typography;
export const BugColumn = (
  edit:any,
  page:any,
  updating:any,
  updatedIndex:any,
  onActiveStatusChange:any
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
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status:any, record:any, index:any) => {
        return (
          <div>
            {updating && index === updatedIndex ? (
              <Title level={5} className="updating">
                Updating...
              </Title>
            ) : (
              <Select
                bordered={true}
                onChange={() => onActiveStatusChange(record, index)}
                className={
                  status === true ? 'active-select' : 'in-active-select'
                }
                value={status === true ? 'Closed' : 'Open'}
              >
                <Option value={status === true ? 'false' : 'true'}>
                  {status === true ? 'Open' : 'Close'}
                </Option>
              </Select>
            )}
          </div>
        );
      },
      sorter: (a:any, b:any) => a.status - b.status
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text:any, record:any) => {
        return (
        <Space size='middle'>
          <Icon icon="ant-design:edit-outlined" fontSize={30} color="grey" onClick={() => edit(record)}/>
        </Space>
        );
      }
    }
  ];
};
