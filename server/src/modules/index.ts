import userTypeDefs from "../modules/users/user.typeDefs";
import journalTypeDefs from "../modules/journal/journal.typeDefs";

import userResolvers from "../modules/users/user.resolvers";
import journalResolvers from "../modules/journal/journal.resolvers";

import { GraphQLJSON, GraphQLDate } from "graphql-scalars";
import tagResolvers from "./tag/tag.resolvers";
import tagTypeDefs from "./tag/tag.typeDefs";

export const typeDefs = [userTypeDefs, journalTypeDefs, tagTypeDefs];

export const resolvers = [
  userResolvers,
  journalResolvers,
  tagResolvers,

  { JSON: GraphQLJSON, Date: GraphQLDate },
];
