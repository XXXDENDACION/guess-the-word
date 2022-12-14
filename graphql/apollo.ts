import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: "http://127.0.0.1:8080/graphql",
    cache: new InMemoryCache()
})

// For server
export const initializeApollo = () => {
    return new ApolloClient({
        uri: "http://127.0.0.1:8080/graphql",
        cache: new InMemoryCache()
    })
}

export default apolloClient;
