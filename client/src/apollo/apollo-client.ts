import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // ✅ 換成你自己的 GraphQL API 地址
  cache: new InMemoryCache(),
});

export default client;
