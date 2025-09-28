import { ApolloError } from "apollo-server-express";

export function throwGraphQLError(
  message: string,
  code = "INTERNAL_SERVER_ERROR",
  extensions: Record<string, any> = {}
): never {
  throw new ApolloError(message, code, extensions);
}
