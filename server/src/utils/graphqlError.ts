import { ApolloError } from "apollo-server-express";
import { ErrorCodes } from "@urmovie/types";

export function throwGraphQLError(
  message: ErrorCodes,
  extensions: Record<string, any> = {}
): never {
  throw new ApolloError(message, message, { code: message, ...extensions });
}
