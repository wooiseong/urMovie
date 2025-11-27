import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    role: String!
    avatar: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    username: String!
    password: String!
    rePassword: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input UpdateUserInput {
    password: String
    rePassword: String
    avatar: String
  }

  type Query {
    _empty: String
    me: User!
  }

  type Mutation {
    registerUser(input: RegisterInput!): AuthPayload!
    loginAccount(input: LoginInput!): AuthPayload!
    updateUser(input: UpdateUserInput!): User!
  }
`;

export default userTypeDefs;
