import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TimeEntries from './components/TimeEntries';

function App() {
  const httpLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
      reconnect: true,
      lazy: true,
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
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      }
    }
  });

  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route path="/time_entries" render={props => isAuthenticated ? (
            <TimeEntries {...props} />)
            : (
              <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
