import { gql } from '@apollo/client';

export const QUERY_ALL_USERS = gql`
  query allUsers {
    users {
      _id
      username
      email
      savedBooks {
        bookId
        title
        description
        authors
        image
        link
      }      
    }
  }
  `;

export const QUERY_USER = gql`
  query user($profileId: ID!) {
    user(profileId: $profileId) {
      _id
      username
      email
      savedBooks {
        bookId
        title
        description
        authors
        image
        link
      }
    }
  }
  `;
