import { gql } from "apollo-server-express";

export const adminStatsTypeDefs = gql`
  type AdminStats {
    totalMembers: Int!
    totalUsers: Int!
    totalPremiumUsers: Int!
    totalJournals: Int!
    totalSalary: Int!
    salaryPercentageChange: Float!
  }

  type TagUsage {
    name: String!
    count: Int!
  }

  type UserStats {
    _id: ID!
    username: String!
    journalCount: Int!
    tags: [TagUsage!]!
    lastJournalDate: String
    createdAt: String
  }

  type UserStatsResponse {
    users: [UserStats!]!
    totalCount: Int!
  }

  extend type Query {
    getAdminStats: AdminStats!
    getUsersWithStats(limit: Int, offset: Int): UserStatsResponse!
  }
`;
