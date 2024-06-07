import { gql } from '@apollo/client';

//the loging functionality
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
// the sign up of a new user
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
//adding a new project. providing title githubRepo, a project description and contact info
export const ADD_PROJECT = gql`
mutation AddProject($title: String!, $description: String!, $githubRepo: String!, $contactInfo: String!) {
  addProject(title: $title, description: $description, githubRepo: $githubRepo, contactInfo: $contactInfo) {
    title
    githubRepo
    description
    contactInfo
  }
}
`

 // adding a resource to the application by providing the topic and content
 export const ADD_RESOURCE =gql`
  mutation AddResource($topic: String!, $content: String!) {
    addResource(topic: $topic, content: $content) {
      topic
      content
      createdAt
    }
  }
 `;

 //adding a comment to a single project
 export const ADD_COMMENT = gql`
  mutation AddComment($projectId: ID!, $commentText: String!) {
    addComment(projectId: $projectId, commentText: $commentText) {
      comments {
        commentText
        commentAuthor
        createdAt
      }
    }
  }
 `;
 //removing one resource using the resourceId
 export const REMOVE_RESOURCE = gql`
  mutation RemoveResource($resourcesId: ID!) {
    removeResource(resourcesId: $resourcesId) {
      content
      createdAt
      topic
    }
  }
 `;

//removing a comment from the project
export const REMOVE_COMMENT =gql`
  mutation RemoveComment($projectId: ID!, $commentId: ID!) {
    removeComment(projectId: $projectId, commentId: $commentId) {
      comments {
        commentText
      }
      _id
    }
  }
`;

 //removing the project
export const REMOVE_PROJECT = gql`
mutation RemoveProject($projectId: ID!) {
  removeProject(projectId: $projectId) {
    title
    description
    githubRepo
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
