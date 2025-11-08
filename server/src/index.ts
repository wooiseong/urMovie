import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { GraphQLJSON, GraphQLDate } from "graphql-scalars";

dotenv.config();

import userTypeDefs from "./modules/users/user.typeDefs";
import userResolvers from "./modules/users/user.resolvers";
import journalTypeDefs from "./modules/journal/journal.typeDefs";
import journalResolvers from "./modules/journal/journal.resolvers";
import authContext from "../src/utils/authContext";
import { seedAdminAccount } from "./utils/seedAdmin";
import path from "path";

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/urMovie";

const app = express();

app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));

// Apollo Server initialization
const server = new ApolloServer({
  typeDefs: [userTypeDefs, journalTypeDefs],
  resolvers: [
    userResolvers,
    journalResolvers,
    { JSON: GraphQLJSON, Date: GraphQLDate },
  ],
  context: authContext,
});

// Connect MongoDB
mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    await seedAdminAccount();

    await server.start().then(() => {
      server.applyMiddleware({ app, path: "/graphql" });

      app.listen(PORT, () => {
        console.log(
          `Server running at http://localhost:${PORT}${server.graphqlPath}`
        );
      });
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
