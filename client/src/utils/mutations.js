import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROJECT = gql`
mutation AddProject($title: String!, $description: String!, $githubRepo: String!, $contactInfo: String!) {
  addProject(title: $title, description: $description, githubRepo: $githubRepo, contactInfo: $contactInfo) {
    contactInfo
    description
    githubRepo
    title
  }
}
`
export const REMOVE_PROJECT = gql`
mutation RemoveProject($projectId: ID!) {
  removeProject(projectId: $projectId) {
    title
  }
}
`;



//TODO: Do we need this?

// export const ADD_COMMENT = gql`
//   mutation addComment($thoughtId: ID!, $commentText: String!) {
//     addComment(thoughtId: $thoughtId, commentText: $commentText) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         createdAt
//       }
//     }
//   }
// `;
