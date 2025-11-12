import { ApolloError } from "apollo-server-express";
import { TagModel } from "./tagSchema";

const tagResolvers = {
  Query: {
    getTags: async () => {
      try {
        return await TagModel.find().sort({ name: 1 });
      } catch (err) {
        throw new ApolloError("Failed to fetch tags");
      }
    },
  },
};

export default tagResolvers;
