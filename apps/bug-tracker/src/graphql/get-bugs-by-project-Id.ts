import { gql } from '@apollo/client';

export const GET_BUGS_BY_PROJECTID = gql`
  query bugsByProjectId($projectId: String!)
  {bugsByProjectId(projectId:$projectId){
    title,
  _id,
  description,
  status
    }
}
`;
