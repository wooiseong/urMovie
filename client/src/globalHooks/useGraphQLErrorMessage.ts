import { ApolloError } from "@apollo/client";

export function useGraphQLErrorMessage() {
  function getGraphQLErrorMessage(error: ApolloError) {
    if (error.graphQLErrors.length > 0) {
      return error.graphQLErrors
        .map((gqlError) => gqlError.message)
        .filter(Boolean)
        .join("\n");
    }
    if (error.networkError) {
      return "網絡錯誤，請檢查連綫或稍後再試";
    }

    return "發生未知錯誤，請稍後再試";
  }
  return getGraphQLErrorMessage;
}
