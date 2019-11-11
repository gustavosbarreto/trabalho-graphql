import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import SignIn from './components/SignIn';
import TimeEntries from './components/TimeEntries';

function App() {
  const httpLink = createHttpLink({
    uri: '/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
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
