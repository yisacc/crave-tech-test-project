import { gql } from '@apollo/client';

export const CREATE_TECH_STACKS = gql`
  mutation createTechStack($name: String!
  ){
  createTechStack(createTechStackInput:{
    name:$name
  }){
    name
  }
}
`;
