import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

const httpLink = createHttpLink({
  uri: SERVER_URL,
  headers: {
    authorization: `ApiToken ${TOKEN}`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
