import { Form, Modal, notification } from 'antd';
import BugManageForm from './bug-manage.form';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_PROJECTS } from '../../../graphql/get-projects';
import { UPDATE_PROJECT } from '../../../graphql/update-project';
import { CREATE_BUG } from '../../../graphql/create-bug';
import { useLocation } from 'react-router-dom';

interface formValues {
  title:string,
  description:string
}
const BugManageModal=({ modalConfig, isModalVisible, onOk, onCancel}:any)=>{
  const [form] = Form.useForm();
  const isEditMode = 'name' in modalConfig.data;
  const [isFormSaving, setIsFormSaving] = useState(false);
  const location = useLocation();
  // @ts-ignore
  const { projectId } = location.state;
  const [createBug, { data, loading, error }] = useMutation(CREATE_BUG, {
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
      message: `${isEditMode ? 'Update' : 'Add'} Bug`,
      description: `Bug ${isEditMode ? 'Updated' : 'Added'} Successfully.`
    });
  };
  const showError = () => {
    setIsFormSaving(false);
    notification.error({
      message: `${isEditMode ? 'Update' : 'Add'} Bug`,
      description: `unable to ${isEditMode ? 'update' : 'add'} bug`
    });
  };
  const addBug=(values:formValues)=>{
    createBug({variables: {
        title: values.title,
        description: values.description,
        project:projectId
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
  const editBug=(values:formValues)=>{
    updateProject({variables: {
       id:modalConfig?.data?._id,
        title: values.title,
        description: values.description,
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
        const {title,description}=values
        if(isEditMode){
          editBug({title,description})
        }else{
          addBug({title,description})
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
             maskClosable={false} okText={'Done'}
             className={'client-manage-modal'} width={800} style={{ top: 20 }}>
      <BugManageForm form={form} />
      </Modal>
      </>
  )
}
export default BugManageModal
