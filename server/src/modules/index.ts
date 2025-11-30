import userTypeDefs from "../modules/users/user.typeDefs";
import journalTypeDefs from "../modules/journal/journal.typeDefs";
import tagTypeDefs from "./tag/tag.typeDefs";
import { adminStatsTypeDefs } from "./adminStats/adminStats.typeDefs";

import userResolvers from "../modules/users/user.resolvers";
import journalResolvers from "../modules/journal/journal.resolvers";
import tagResolvers from "./tag/tag.resolvers";
import { adminStatsResolvers } from "./adminStats/adminStats.resolvers";

import { GraphQLJSON, GraphQLDate } from "graphql-scalars";

export const typeDefs = [
  userTypeDefs,
  journalTypeDefs,
  tagTypeDefs,
  adminStatsTypeDefs,
];

export const resolvers = [
  userResolvers,
  journalResolvers,
  tagResolvers,
  adminStatsResolvers,
  { JSON: GraphQLJSON, Date: GraphQLDate },
];
