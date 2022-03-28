import { Form, Modal, notification } from 'antd';
import BugManageForm from './bug-manage.form';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BUG } from '../../../graphql/create-bug';
import { useLocation } from 'react-router-dom';
import { GET_BUGS_BY_PROJECTID } from '../../../graphql/get-bugs-by-project-Id';
import { UPDATE_BUG } from '../../../graphql/update-bug';

interface formValues {
  title:string,
  description:string
}
const BugManageModal=({ modalConfig, isModalVisible, onOk, onCancel}:any)=>{
  const [form] = Form.useForm();
  const isEditMode = '_id' in modalConfig.data;
  const [isFormSaving, setIsFormSaving] = useState(false);
  const location = useLocation();
  // @ts-ignore
  const { projectId } = location.state;
  const [createBug, { data, loading, error }] = useMutation(CREATE_BUG, {
    refetchQueries: [
      GET_BUGS_BY_PROJECTID,
      'bugsByProjectId'
    ],
  });
  const [updateBug, { data:updateData, loading:updateLoading, error:updateError }] = useMutation(UPDATE_BUG, {
    refetchQueries: [
      GET_BUGS_BY_PROJECTID,
      'bugsByProjectId'
    ],
  });
 useEffect(()=>{
   if(isEditMode) {
     const formData = {
       title: modalConfig.data?.title,
       description: modalConfig.data?.description
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
    updateBug({variables: {
       id:modalConfig?.data?._id,
        title: values.title,
        description: values.description
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
