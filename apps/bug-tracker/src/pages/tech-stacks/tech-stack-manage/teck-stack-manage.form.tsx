import { Form, Input, Select } from 'antd';
import { gql, useQuery } from '@apollo/client';

const ProjectManageForm=({form}:any)=>{
  const GetTechStacks = gql`{
  techStacks {
  name,
  _id
    }
}
`;
  const { data, loading, error } = useQuery(GetTechStacks);
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
            placeholder="Company"
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
