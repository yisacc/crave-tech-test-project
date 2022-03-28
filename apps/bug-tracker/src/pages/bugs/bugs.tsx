import { Button, Input, Table } from 'antd';
import { useState } from 'react';
import ProjectManageModal from './project-manage/project-manage.modal';
import { ProjectColumn } from './columns/columns';
import { useQuery } from "@apollo/client";
import { ProjectLoading } from './project-loading';
import { GET_PROJECTS } from '../../graphql/get-projects';
import { Icon } from '@iconify/react';


 const ProjectPage=()=>{
   const [page,setPage]=useState(1)
   const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);
   const [projectModalConfig, setProjectModalConfig] = useState({
     title: 'Add Project',
     data: {}
   });
   const showProjectModal = () => {
     setProjectModalConfig({ title: 'Add Project', data: {} });
     setIsProjectModalVisible(true);
   };

   const editProject = (data:[]) => {
     setProjectModalConfig({ title: 'Edit Project', data });
     setIsProjectModalVisible(true);
   };

   const handleProjectModalOk=()=>{
     setIsProjectModalVisible(false);
   }
   const handleProjectModalCancel=()=>{
     setIsProjectModalVisible(false);
   }


   const { data, loading, error } = useQuery(GET_PROJECTS);
  if(loading){
    return <ProjectLoading />
  }
  return(
    <div className="p-2">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center justify-center">
        </div>
        <Button
          id="submit"
          type="primary"
          htmlType="submit"
          className="app-btn-container-btn pl-10 pr-10"
          onClick={showProjectModal}
        >
          Add Project
        </Button>
        <ProjectManageModal
          modalConfig={projectModalConfig}
          isModalVisible={isProjectModalVisible}
          onOk={handleProjectModalOk}
          onCancel={handleProjectModalCancel}
        />
      </div>
      <Table
        columns={ProjectColumn(
          editProject,
          loading,
          page
        )}
        dataSource={data?.projects}
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
export default ProjectPage
