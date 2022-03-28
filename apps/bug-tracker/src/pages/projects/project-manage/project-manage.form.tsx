import { Form, Input, Select } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { GET_TECH_STACKS } from '../../../graphql/get-tech-stacks';

const ProjectManageForm=({form}:any)=>{

  const { data, loading, error } = useQuery(GET_TECH_STACKS);
  return(
    <>
      <Form
        layout={'vertical'}
        form={form}
        preserve={false}
      >
        <Form.Item label="Project Name"
                   name="name"
                   rules={[{ required: true, message: 'Please enter project name' }]}
        >
          <Input placeholder="example" />
        </Form.Item>
        <Form.Item name={['techStack']}
                   label={'Tech Stack'}
                   rules={[{ required: true, message: 'Please select tech stack' }]}>
          <Select
            showSearch={false}
            mode="multiple"
            placeholder="Tech-Stack"
            optionFilterProp="children"
            loading={loading}
            options={data?.techStacks
              .map((_:any, index:number) => {
                return {
                  key: index,
                  value: _._id,
                  label: _.name
                };
              })}
          >
          </Select>
        </Form.Item>
      </Form>
    </>
  )
}
export default ProjectManageForm
