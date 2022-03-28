import { Form, Input, Select } from 'antd';
import { gql, useQuery } from '@apollo/client';

const TeckStackManageForm=({form}:any)=>{

  return(
    <>
      <Form
        layout={'vertical'}
        form={form}
        preserve={false}
      >
        <Form.Item label="Tech Stack"
                   name="name"
                   rules={[{ required: true, message: 'Please enter tech stack' }]}
        >
          <Input placeholder="example" />
        </Form.Item>
         </Form>
    </>
  )
}
export default TeckStackManageForm
