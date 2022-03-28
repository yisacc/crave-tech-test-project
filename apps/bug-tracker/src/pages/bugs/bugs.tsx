import { Button, notification, Table } from 'antd';
import { useEffect, useState } from 'react';
import BugManageModal from './bug-manage/bug-manage.modal';
import { InMemoryCache, useMutation, useQuery } from '@apollo/client';
import { TableLoading } from '../../components/loading';
import { useLocation } from 'react-router-dom';
import { GET_PROJECT_BY_ID } from '../../graphql/get-project-by-id';
import ProjectOverview from './project-overview';
import { GET_BUGS_BY_PROJECTID } from '../../graphql/get-bugs-by-project-Id';
import { BugColumn } from './columns/columns';
import { UPDATE_BUG } from '../../graphql/update-bug';
import { UPDATE_BUG_STATUS } from '../../graphql/update-bug-status';


 const BugPage=()=>{
   const location = useLocation();
   // @ts-ignore
   const { projectId } = location.state;
   const [page,setPage]=useState(1)
   const [project,setProject]=useState({})
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [modalConfig, setModalConfig] = useState({
     title: 'Add Bug',
     data: {}
   });
   const [updating, setUpdating] = useState(false);
   const [updatedIndex, setUpdatedIndex] = useState(-1);
   const [rowToUpdate, setRowToUpdate] = useState(null);
   const showModal = () => {
     setModalConfig({ title: 'Add Bug', data: {} });
     setIsModalVisible(true);
   };

   const cache = new InMemoryCache({
     typePolicies: {
       Query: {
         fields: {
           readProjects: {
             read(projects, options) {
               return projects;
             }
           }
         },
       },
     },
   });
   const edit = (data:[]) => {
     setModalConfig({ title: 'Edit Bug', data });
     setIsModalVisible(true);
   };
  const onSucces=()=>{
     notification['success']({
       message: 'Update bug',
       description: 'Bug status updated successfully',
       duration: 2.5,
     });
   }
   const onActiveStatusChange = (data:any, index:any) => {
     setRowToUpdate(data);
     setUpdatedIndex(index);
     setUpdating(true)
     updateBugStatus({variables: {
         id: data._id,
         status: !data.status,
       }})
       .then(response=> {
         onSucces()
         setUpdating(false)
         }
       )
       .catch(error=>{
         console.log(error)
         setUpdating(false)
       })
   };

   const handleModalOk=()=>{
     setIsModalVisible(false);
   }
   const handleModalCancel=()=>{
     setIsModalVisible(false);
   }

   const {
     data,
     loading,
     error,
   } = useQuery(GET_BUGS_BY_PROJECTID,
     { variables: { projectId } }
   );
   const { data:projectData, loading:projectLoading, error:projectError } = useQuery(GET_PROJECT_BY_ID);
   const [updateBugStatus, { data:updateData, loading:updateLoading, error:updateError }] = useMutation(UPDATE_BUG_STATUS, {
     refetchQueries: [
       GET_BUGS_BY_PROJECTID,
       'bugsByProjectId'
     ],
   });
   useEffect(()=>{
     const currentProject=projectData?.projects?.filter((pr:any)=>pr._id===projectId)[0]
     setProject(currentProject)
   },[projectData])
  if(loading){
    return <TableLoading />
  }
  return(
    <div className="p-2">
      <ProjectOverview project={project} />
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center justify-center">
        </div>
        <Button
          id="submit"
          type="primary"
          htmlType="submit"
          className="app-btn-container-btn pl-10 pr-10"
          onClick={showModal}
        >
          Add Bug
        </Button>
        <BugManageModal
          modalConfig={modalConfig}
          isModalVisible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        />
      </div>
      <Table
        columns={BugColumn(
          edit,
          page,
          updating,
          updatedIndex,
          onActiveStatusChange
        )}
        dataSource={data?.bugsByProjectId}
        rowKey={'_id'}
        pagination={{
          pageSize: 10,
          onChange(current) {
            setPage(current);
          },
          position: ['bottomLeft'],
          style: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }
        }}
      />

    </div>
  )
}
export default BugPage
