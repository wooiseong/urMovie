import { ErrorCodes } from "@urmovie/types";
import { GraphQLError } from "graphql";
import { Context } from "../../utils/authContext";
import { TagModel } from "./tagSchema";

const tagResolvers = {
  Query: {
    async getTags(_: unknown, __: unknown, context: Context) {
      if (!context.user) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      try {
        return await TagModel.find({ userId: context.user.id }).sort({
          name: 1,
        });
      } catch (err) {
        throw new GraphQLError("Failed to fetch tags", {
          extensions: { code: ErrorCodes.INTERNAL_SERVER_ERROR },
        });
      }
    },
  },
  Tag: {
    id: (parent: any) => parent._id?.toString() ?? parent.id,
  },
};

export default tagResolvers;
