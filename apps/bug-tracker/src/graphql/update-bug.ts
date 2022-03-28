import { gql } from '@apollo/client';

export const UPDATE_BUG = gql`
  mutation updateBug($id: String! $title: String!
  $description: String!
  ){
  updateBug(updateBugInput:{
    id:$id
    title:$title,
    description:$description
  }){
    _id
  }
}
`;
