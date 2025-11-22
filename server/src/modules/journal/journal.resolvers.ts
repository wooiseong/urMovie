import { ErrorCodes } from "@shared-types/errorCodes";
import { GraphQLJSON } from "graphql-type-json";
import { DateTimeResolver } from "graphql-scalars";
import { JournalModel } from "./journalSchema";
import {
  MutationCreateJournalArgs,
  MutationDeleteJournalArgs,
  MutationUpdateJournalArgs,
  QueryJournalArgs,
} from "../../generated/graphql";
import { Context } from "../../utils/authContext";
import { GraphQLError } from "graphql";
import { handleImageUpload, processTags } from "./journal.helper";

const journalResolvers = {
  Query: {
    async journals(_: unknown, __: unknown, context: Context) {
      if (!context.user)
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      try {
        // 只返回該使用者的 journal
        return await JournalModel.find({ userId: context.user.id }).sort({
          createdAt: -1,
        });
      } catch (error) {
        throw new GraphQLError("Failed to fetch journals", {
          extensions: { code: ErrorCodes.INTERNAL_SERVER_ERROR },
        });
      }
    },

    async journal(_: unknown, { id }: QueryJournalArgs, context: Context) {
      if (!context.user)
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      try {
        const journal = await JournalModel.findOne({
          _id: id,
          userId: context.user.id,
        });
        if (!journal) {
          throw new GraphQLError("Journal not found", {
            extensions: { code: ErrorCodes.NOT_FOUND },
          });
        }
        return journal;
      } catch (error) {
        throw new GraphQLError("Failed to fetch journal", {
          extensions: { code: ErrorCodes.INTERNAL_SERVER_ERROR },
        });
      }
    },
  },

  Mutation: {
    async createJournal(
      _: unknown,
      { input }: MutationCreateJournalArgs,
      context: Context
    ) {
      if (!context.user)
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      try {
        const userId = context.user.id;
        const imageUrl = handleImageUpload(input.image || "", userId);

        const tagResults = await processTags(input.tag || [], userId);

        const newJournal = new JournalModel({
          ...input,
          userId, // 存使用者 ID
          tag: tagResults,
          image: imageUrl,
          date: new Date(),
        });

        const savedJournal = await newJournal.save();
        return savedJournal;
      } catch (error) {
        console.error("Create Journal Error:", error);
        throw new GraphQLError("Failed to create journal", {
          extensions: { code: ErrorCodes.INTERNAL_SERVER_ERROR },
        });
      }
    },

    async updateJournal(
      _: unknown,
      { id, input }: MutationUpdateJournalArgs,
      context: Context
    ) {
      if (!context.user)
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      try {
        const userId = context.user.id;
        const updateData: any = { ...input };

        if (input.image !== undefined) {
          const imageUrl = handleImageUpload(input.image || "", userId);
          updateData.image = imageUrl;
        }

        if (input.tag) {
          updateData.tag = await processTags(input.tag, userId);
        }

        // 只更新該使用者的 journal
        const updatedJournal = await JournalModel.findOneAndUpdate(
          { _id: id, userId },
          { ...updateData, updatedAt: new Date() },
          { new: true }
        );

        if (!updatedJournal) {
          throw new GraphQLError("Journal not found", {
            extensions: { code: ErrorCodes.NOT_FOUND },
          });
        }

        return updatedJournal;
      } catch (error) {
        console.error("Update Journal Error:", error);
        throw new GraphQLError("Failed to update journal", {
          extensions: { code: ErrorCodes.INTERNAL_SERVER_ERROR },
        });
      }
    },

    async deleteJournal(
      _: unknown,
      { id }: MutationDeleteJournalArgs,
      context: Context
    ) {
      if (!context.user)
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      try {
        const deleted = await JournalModel.findOneAndDelete({
          _id: id,
          userId: context.user.id,
        });
        if (!deleted) {
          throw new GraphQLError("Journal not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return true;
      } catch (error) {
        console.error("Delete Journal Error:", error);
        throw new GraphQLError("Failed to delete journal", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
  },

  Journal: {
    id: (parent: any) => parent._id.toString(),
  },

  JSON: GraphQLJSON,
  Date: DateTimeResolver,
};

export default journalResolvers;
