import { Form, Modal, notification } from 'antd';
import ProjectManageForm from './project-manage.form';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

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

const ProjectManageModal=({ modalConfig, isModalVisible, onOk, onCancel}:any)=>{
  const [form] = Form.useForm();
  const isEditMode = '_Id' in modalConfig.data;
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [createProject, { data, loading, error }] = useMutation(CREATE_PROJECT, {
      variables: {
        text: "placeholder",
        someOtherVariable: 1234,
      },
    });

  const showSuccess = () => {
    setIsFormSaving(false);
    form.resetFields();
    notification.success({
      message: `${isEditMode ? 'Update' : 'Add'} Project`,
      description: `Project ${isEditMode ? 'Updated' : 'Added'} Successfully.`
    });
  };
  const showError = () => {
    setIsFormSaving(false);
    notification.error({
      message: `${isEditMode ? 'Update' : 'Add'} Project`,
      description: `unable to ${isEditMode ? 'update' : 'add'} project`
    });
  };
  const handleModalOk = () => {
    setIsFormSaving(true);
    form
      .validateFields()
      .then(values => {
        const [createProject, { data, loading, error }] = useMutation(CREATE_PROJECT, {
          variables: {
            text: values.name,
            someOtherVariable: values.techStack,
          },
        });
        if(error){
          showError();
        }else{
          showSuccess();
        }
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
      <ProjectManageForm form={form} />
      </Modal>
      </>
  )
}
export default ProjectManageModal
