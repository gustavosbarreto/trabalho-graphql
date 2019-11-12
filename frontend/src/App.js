import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import SignIn from './components/SignIn';
import TimeEntries from './components/TimeEntries';

function App() {
  const httpLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
      reconnect: true,
      connectionParams: () => {
        const token = localStorage.getItem('token');

        if (!token) {
          return {}
        }

        return {
          Authorization: `Bearer ${token}`
        };
      }
    },
  });

  const client = new ApolloClient({
    link: httpLink,//authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/time_entries" component={TimeEntries} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
