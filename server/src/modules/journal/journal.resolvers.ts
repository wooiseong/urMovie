import { ErrorCodes } from "@shared-types/errorCodes";
import { GraphQLJSON } from "graphql-type-json";
import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars";
import { JournalModel } from "./journalSchema";
import {
  MutationCreateJournalArgs,
  MutationDeleteJournalArgs,
  MutationUpdateJournalArgs,
  QueryJournalArgs,
} from "../../generated/graphql";
import { Context } from "../../utils/authContext";
import { GraphQLError } from "graphql";
import { handleImageUpload } from "./journal.helper";

const config = require("../../config");

const journalResolvers = {
  Query: {
    async journals() {
      try {
        return await JournalModel.find().sort({ createdAt: -1 });
      } catch (error) {
        throw new GraphQLError("Failed to fetch journals", {
          extensions: { code: ErrorCodes.INTERNAL_SERVER_ERROR },
        });
      }
    },
    async journal(_: unknown, { id }: QueryJournalArgs, context: Context) {
      try {
        const journal = await JournalModel.findById(id);
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
      try {
        // if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
        const userId = "test-user"; // Replace with actual user ID from context
        const imageUrl = handleImageUpload(input.image || "", userId);

        const newJournal = new JournalModel({
          ...input,
          image: imageUrl,
          date: new Date(),
          // author: userId
        });

        const savedJournal = await newJournal.save();
        return savedJournal;
      } catch (error) {
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
      try {
        // if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
        const userId = "test-user"; // Replace with actual user ID from context

        const updateData = { ...input };

        if (input.image !== undefined) {
          const imageUrl = handleImageUpload(input.image || "", userId);
          updateData.image = imageUrl;
        }

        const updatedJournal = await JournalModel.findByIdAndUpdate(
          id,
          { ...updateData, updatedAt: new Date() },
          { new: true }
        );

        if (!updatedJournal) {
          throw new GraphQLError("Journal not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }

        return updatedJournal;
      } catch (error) {
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
      try {
        // if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });

        const deleted = await JournalModel.findByIdAndDelete(id);
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
  JSON: GraphQLJSON,
  Date: DateTimeResolver,
};

export default journalResolvers;
