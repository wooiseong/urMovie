import { ApolloError } from "@apollo/client";
import { useTranslation } from "react-i18next";

export function useGraphQLErrorMessage() {
  const { t } = useTranslation();

  function getGraphQLErrorMessage(error: ApolloError) {
    if (error.graphQLErrors.length > 0) {
      return error.graphQLErrors
        .map((gqlError) => {
          const errorCode = gqlError?.message;
          const fallbackMessage = gqlError.message;
          if (typeof errorCode === "string") {
            const translated = t(errorCode);
            return translated !== errorCode ? translated : fallbackMessage;
          }

          return fallbackMessage;
        })
        .filter(Boolean)
        .join("\n");
    }

    if (error.networkError) {
      return t("NETWORK_ERROR");
    }

    return t("UNKNOWN");
  }

  return getGraphQLErrorMessage;
}
