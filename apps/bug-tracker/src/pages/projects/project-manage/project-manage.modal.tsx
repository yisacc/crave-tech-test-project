import { Form, Modal, notification } from 'antd';
import ProjectManageForm from './project-manage.form';
import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../../../graphql/create-project';
import { GET_PROJECTS } from '../../../graphql/get-projects';
import { UPDATE_PROJECT } from '../../../graphql/update-project';

interface formValues {
  name:string,
  techStack:string
}


const ProjectManageModal=({ modalConfig, isModalVisible, onOk, onCancel}:any)=>{
  const [form] = Form.useForm();
  const isEditMode = 'name' in modalConfig.data;
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [createProject, { data, loading, error }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [
      GET_PROJECTS,
      'projects'
    ],
  });
  const [updateProject, { data:updateData, loading:updateLoading, error:updateError }] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [
      GET_PROJECTS,
      'projects'
    ],
  });
 useEffect(()=>{
   if(isEditMode) {
     const formData = {
       name: modalConfig.data?.name,
       techStack: modalConfig.data?.techStack?._id
     }
     form.setFieldsValue(formData)
   }
 },[modalConfig])

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
  const addProject=(values:formValues)=>{
    createProject({variables: {
        name: values.name,
        techStack: values.techStack,
      }})
      .then(response=> {
          showSuccess();
        onOk()
        }
      )
      .catch(error=>{
        showError()
        onOk()
      })
  }
  const editProject=(values:formValues)=>{
    updateProject({variables: {
       id:modalConfig?.data?._id,
        name: values.name,
        techStack: values.techStack,
      }})
      .then(response=> {
          showSuccess();
          onOk()
        }
      )
      .catch(error=>{
        showError()
        onOk()
      })
  }
  const handleModalOk = () => {
    setIsFormSaving(true);
    form
      .validateFields()
      .then(values => {
        const {name,techStack}=values
        if(isEditMode){
          editProject({name,techStack})
        }else{
          addProject({name,techStack})
        }
      })
      .catch((error) => {
        setIsFormSaving(false)
        onOk();
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
             maskClosable={false} okText={'Done'} width={460} style={{ top: 20 }}>
      <ProjectManageForm form={form} />
      </Modal>
      </>
  )
}
export default ProjectManageModal
