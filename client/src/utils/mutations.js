import {gql} from '@apollo/client'

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
mutation createUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($userId: ID!, $book: String!) {
  saveBook(userId: $userId, book: $book) {
    user {
      _id
      username
      savedBooks {
        title
      }
    }
  }
}
`;

export const DELETE_BOOK = gql`
mutation deleteBook($_id: ID!, $bookId: String!) {
  deleteBook(_id: $_id, bookId: $bookId) {
    user {
      _id
      username
      savedBooks {
        title
      }
    }
  }
}
`;