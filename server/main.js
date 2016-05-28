import { Meteor } from 'meteor/meteor';
import { apolloServer } from 'graphql-tools';
import express from 'express';
import proxyMiddleware from 'http-proxy-middleware';

// schema and resolvers
import schema from '/imports/data/schema';
import resolvers from '/imports/data/resolvers';

const GRAPHQL_PORT = 4000;

const graphQLServer = express();

graphQLServer.use('/', apolloServer({
  graphiql: true,
  pretty: true,
  schema,
  resolvers
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is running on port ${GRAPHQL_PORT}`
));

// apollo server middleware
WebApp.rawConnectHandlers.use(proxyMiddleware(`http://localhost:${GRAPHQL_PORT}/graphql`));

Meteor.startup(() => {
  // code to run on server at startup
});
