import { gql } from '@apollo/client';

export const UPDATE_PROJECT = gql`
  mutation updateProject($id: String! $name: String!
  $techStack: String!
  ){
  updateProject(updateProjectInput:{
    id:$id
    name:$name,
    techStack:$techStack
  }){
    name
  }
}
`;
