import { gql } from "apollo-server-express";

const journalTypeDefs = gql`
  scalar JSON
  scalar Date

  type Quote {
    name: String
    content: String
    backgroundColor: String
    textColor: String
  }

  type Tag {
    _id: ID!
    name: String!
    selected: Boolean!
  }

  input TagInput {
    id: ID
    name: String!
    selected: Boolean!
    isNew: Boolean
    isEdited: Boolean
    isDeleted: Boolean
  }

  type Journal {
    _id: ID!
    movieName: String!
    director: [String!]
    actor: [String!]
    tag: [Tag!]
    image: String
    title: String!
    content: JSON!
    quote: [Quote!]
    date: Date!
  }

  input QuoteInput {
    name: String
    content: String
    backgroundColor: String
    textColor: String
  }

  input CreateJournalInput {
    movieName: String!
    director: [String!]
    actor: [String!]
    tag: [TagInput!]
    image: String
    title: String!
    content: JSON!
    quote: [QuoteInput!]
  }

  input UpdateJournalInput {
    movieName: String
    director: [String!]
    actor: [String!]
    tag: [TagInput!]
    image: String
    title: String
    content: JSON
    quote: [QuoteInput!]
  }

  type Query {
    journals: [Journal!]
    journal(id: ID!): Journal
  }

  type Mutation {
    createJournal(input: CreateJournalInput!): Journal!
    updateJournal(id: ID!, input: UpdateJournalInput!): Journal!
    deleteJournal(id: ID!): Boolean!
  }
`;

export default journalTypeDefs;
