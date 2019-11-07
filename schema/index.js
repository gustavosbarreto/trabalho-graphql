const { gql } = require('apollo-server');
const user = require('./user');

const root = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`

export default [root, user];
