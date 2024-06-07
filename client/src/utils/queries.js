import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($username: String) {
    user(username: $username) {
      _id
      username
      email
      jobStatus
      linkedin
      projects {
        title
        githubRepo
        description
        createdAt
        contactInfo
      }
    }
}
`;

//getting a list of all the users
export const QUERY_ALL_USER =gql`
  query Users {
  users {
    username
  }
}
`;
//getting the projects list with all the comments
export const QUERY_PROJECTS= gql`
query Projects {
  projects {
    title
    description
    githubRepo
    contactInfo
    projectAuthor
    createdAt
    comments {
      commentAuthor
      commentText
      createdAt
    }
  }
}
`;
//getting a single project with the project description, title and project author
export const QUERY_SINGLE_PROJECT =gql`
query Project($projectId: ID!) {
  project(projectId: $projectId) {
    description
    title
    projectAuthor
  }
}
`;
//geting the current user and the projects the have
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

// getting  all the resources in the database. if the user wants to  get a certain 
//topic they can search using that topic
export const QUERY_RESOURCES = gql`
  query Resources($topic: String) {
    resources(topic: $topic) {
      topic
      content
      createdAt
    }
  }
`;


