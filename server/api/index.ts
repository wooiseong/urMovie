import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import { typeDefs, resolvers } from "../src/modules/index";
import authContext from "../src/utils/authContext";
import { seedAdminAccount } from "../src/utils/seedAdmin";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/urMovie";

const app = express();

// Enable CORS for all origins (configure as needed for production)
app.use(cors());

// Apollo Server initialization
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authContext,
});

let isInitialized = false;

async function initializeServer() {
  if (isInitialized) return;

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    await seedAdminAccount();
    await server.start();
    server.applyMiddleware({ app: app as any, path: "/graphql" });

    isInitialized = true;
  } catch (err) {
    console.error("Server initialization error:", err);
    throw err;
  }
}

// Vercel serverless handler
export default async function handler(req: any, res: any) {
  await initializeServer();
  return app(req, res);
}
