import { gql } from '@apollo/client';

export const CREATE_BUG = gql`
  mutation createBug($title: String!
  $project: String!
  $description: String!
  ){
  createBug(createBugInput:{
    title:$title,
    project:$project
    description:$description
  }){
  _id
  }
}
`;
