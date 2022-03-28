import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation createProject($name: String!
  $techStack: [String!]!
  ){
  createProject(createProjectInput:{
    name:$name,
    techStack:$techStack
  }){
    name
  }
}
`;
