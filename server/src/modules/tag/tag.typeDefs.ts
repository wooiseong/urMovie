import { gql } from "apollo-server-express";

const tagTypeDefs = gql`
  type Tag {
    _id: ID!
    name: String!
  }

  input TagInput {
    id: ID
    name: String!
    selected: Boolean!
    isNew: Boolean
    isEdited: Boolean
    isDeleted: Boolean
  }

  extend type Query {
    getTags: [Tag!]
  }
`;

export default tagTypeDefs;
