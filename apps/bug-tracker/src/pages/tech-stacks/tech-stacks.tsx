import { Button,Table } from 'antd';
import {useState } from 'react';
import TechStackManageModal from './tech-stack-manage/tech-stack-manage.modal';
import {  TechStackColumn } from './columns/columns';
import { useQuery } from "@apollo/client";
import { GET_TECH_STACKS } from '../../graphql/get-tech-stacks';
import { TableLoading } from '../../components/loading';



 const TechStackPage=()=>{
   const [page,setPage]=useState(1)
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [modalConfig, setModalConfig] = useState({
     title: 'Add Tech-Stack',
     data: {}
   });
   const showModal = () => {
     setModalConfig({ title: 'Add Tech-Stack', data: {} });
     setIsModalVisible(true);
   };

   const edit = (data:[]) => {
     setModalConfig({ title: 'Edit Tech-Stack', data });
     setIsModalVisible(true);
   };

   const handleModalOk=()=>{
     setIsModalVisible(false);

   }
   const handleModalCancel=()=>{
     setIsModalVisible(false);

   }
   const { data, loading, error } = useQuery(GET_TECH_STACKS);
  if(loading){
    return <TableLoading />
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
          onClick={showModal}
        >
          Add Tech-Stack
        </Button>
        <TechStackManageModal
          modalConfig={modalConfig}
          isModalVisible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        />
      </div>
      <Table
        columns={TechStackColumn(
          edit,
          loading,
          page
        )}
        dataSource={data?.techStacks}
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
export default TechStackPage
