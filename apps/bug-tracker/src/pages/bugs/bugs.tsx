import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import BugManageModal from './bug-manage/bug-manage.modal';
import { InMemoryCache, useQuery } from '@apollo/client';
import { TableLoading } from '../../components/loading';
import { useLocation } from 'react-router-dom';
import { GET_PROJECT_BY_ID } from '../../graphql/get-project-by-id';
import ProjectOverview from './project-overview';
import { GET_BUGS_BY_PROJECTID } from '../../graphql/get-bugs-by-project-Id';
import { BugColumn } from './columns/columns';


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
          loading,
          page
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
