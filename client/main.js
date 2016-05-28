import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

// client
import AppData from '/imports/client/App';

const networkInterface = createNetworkInterface('/graphql');
const client = new ApolloClient({networkInterface});

Meteor.startup(() => {
  render(<ApolloProvider client={client}>
    <AppData />
  </ApolloProvider>, document.getElementById('root'));
});
