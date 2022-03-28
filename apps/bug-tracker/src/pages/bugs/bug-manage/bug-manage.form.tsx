import { Form, Input, Select } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { GET_TECH_STACKS } from '../../../graphql/get-tech-stacks';
import TextArea from 'antd/es/input/TextArea';

const BugManageForm=({form}:any)=>{

  const { data, loading, error } = useQuery(GET_TECH_STACKS);
  return(
    <>
      <Form
        layout={'vertical'}
        form={form}
        preserve={false}
      >
        <Form.Item label="Bug Title"
                   name="title"
                   rules={[{ required: true, message: 'Please enter bug title' }]}
        >
          <Input placeholder="example" />
        </Form.Item>
        <Form.Item label="Description"
                   name="description"
                   rules={[{ required: true, message: 'Please enter description' }]}
        >
          <TextArea showCount maxLength={1000} style={{ height: 120 }} />
        </Form.Item>

      </Form>
    </>
  )
}
export default BugManageForm
