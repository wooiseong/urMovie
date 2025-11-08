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

  type Journal {
    _id: ID!
    movieName: String!
    director: [String!]
    actor: [String!]
    tag: [String!]
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
    tag: [String!]
    image: String
    title: String!
    content: JSON!
    quote: [QuoteInput!]
  }

  input UpdateJournalInput {
    movieName: String
    director: [String!]
    actor: [String!]
    tag: [String!]
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
