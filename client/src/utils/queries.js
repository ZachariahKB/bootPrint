import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_PROJECTS= gql`
query Projects {
  projects {
    contactInfo
    description
    githubRepo
    title
  }
}
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      projects {
        _id
        description
        projectAuthor
        createdAt
      }
    }
  }
`;
