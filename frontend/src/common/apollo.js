import {CONFIG}  from '../config';
import {ApolloClient} from 'apollo-boost';
import {WebSocketLink} from 'apollo-link-ws';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {split} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {getMainDefinition} from 'apollo-utilities';

const GRAPHQL_URL = `${CONFIG.API_BASE_URL}:${CONFIG.GRAPHQL_PORT}/v1/graphql`;

console.log('GRAPHQL_URL: ', GRAPHQL_URL);

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: `ws://${GRAPHQL_URL}`,
    options: {
        reconnect: true
    }
});

// Create an http link:
const httpLink = new HttpLink({
    uri: `http://${GRAPHQL_URL}`
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
    // split based on operation type
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
});

// const client = new ApolloClient({
//     uri: `http://${GRAPHQL_URL}`,
//     // cache: new InMemoryCache(),
// });

export default client;