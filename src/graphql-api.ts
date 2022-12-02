import { gql } from 'graphql-request';

export const registerUser =  gql`
  mutation registerUser($user: User_insert_input!) {
    insert_User_one(object: $user) {
      id
    }
  }
  `

export const getUserByEmail =  gql`
  query getUserByEmail($email: String!) {
    User(where: { email: { _eq: $email } }) {
      id
      password
    }
  }
  `

export const getUserName =  gql`
      query getUserName($id: String!) {
        User(where: { id: { _eq: $id } }) {
          id
          name
          email
        }
      }
    `