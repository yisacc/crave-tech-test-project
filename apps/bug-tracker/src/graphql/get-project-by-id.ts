import { gql } from '@apollo/client';

export const GET_PROJECT_BY_ID = gql`query GetProjectById {
     projects {
       name,
       _id,
       techStack{
            name,
            _id
          }
       readProjects @client
     }
   }
`;
