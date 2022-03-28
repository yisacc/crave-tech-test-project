import { gql } from '@apollo/client';

export const GET_TECH_STACKS = gql`{
  techStacks {
  name,
  _id
    }
}
`;
