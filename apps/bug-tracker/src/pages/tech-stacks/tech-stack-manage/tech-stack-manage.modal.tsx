import { Form, Modal, notification } from 'antd';
import TeckStackManageForm from './teck-stack-manage.form';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { GET_PROJECTS } from '../../../graphql/get-projects';
import { CREATE_TECH_STACKS } from '../../../graphql/create-tech-stack';
import { GET_TECH_STACKS } from '../../../graphql/get-tech-stacks';

const CREATE_PROJECT = gql`
  mutation createProject($name: String! $techStack: String!){
  createProject(createProjectInput:{
    name:$name,
    techStack:$techStack
  }){
    name
  }
}
`;

const TechStackManageModal=({ modalConfig, isModalVisible, onOk, onCancel}:any)=>{
  const [form] = Form.useForm();
  const isEditMode = '_Id' in modalConfig.data;
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [createTechStack, { data, loading, error }] = useMutation(CREATE_TECH_STACKS, {
    refetchQueries: [
      GET_TECH_STACKS,
      'techStacks'
    ],
  });

  const showSuccess = () => {
    setIsFormSaving(false);
    form.resetFields();
    notification.success({
      message: `${isEditMode ? 'Update' : 'Add'} Tech Stack`,
      description: `Tech Stack ${isEditMode ? 'Updated' : 'Added'} Successfully.`
    });
  };
  const showError = () => {
    setIsFormSaving(false);
    notification.error({
      message: `${isEditMode ? 'Update' : 'Add'} Tech Stack`,
      description: `unable to ${isEditMode ? 'update' : 'add'} Tech Stack`
    });
  };
  const handleModalOk = () => {
    setIsFormSaving(true);
    form
      .validateFields()
      .then(values => {
        createTechStack({variables: {
            name: values.name,
          }})
          .then(response=> {
              showSuccess();
            }
          )
          .catch(error=>{
            showError()
          })
        onOk();
      })
      .catch(() => {
        setIsFormSaving(false)
      });
  };
  const handleModalCancel = () => {
    if (!isFormSaving) {
      setIsFormSaving(false);
      form.resetFields();
      onCancel();
    }
  };
  return(
    <>
      <Modal title={modalConfig.title} visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}
             closable={false} confirmLoading={isFormSaving}
             maskClosable={false} okText={'Done'}
             className={'client-manage-modal'} width={460} style={{ top: 20 }}>
      <TeckStackManageForm form={form} />
      </Modal>
      </>
  )
}
export default TechStackManageModal
