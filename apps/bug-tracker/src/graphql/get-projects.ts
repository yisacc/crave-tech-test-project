import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`{
  projects{
    name,
    _id,
    techStack{
      name,
      _id
    }
  }
}
`;
