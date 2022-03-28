import { gql } from '@apollo/client';

export const UPDATE_BUG_STATUS = gql`
  mutation updateBugStatus($id: String! $status: Boolean!
  ){
  updateBugStatus(updateBugStatusInput:{
    id:$id
    status:$status
  }){
    _id
  }
}
`;
