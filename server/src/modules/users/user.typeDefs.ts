import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    role: String!
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

  type Mutation {
    registerUser(input: RegisterInput!): AuthPayload!
    loginAccount(input: LoginInput!): AuthPayload!
  }

  type Query {
    _empty: String
  }
`;

export default userTypeDefs;
