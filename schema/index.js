const { gql } = require('apollo-server');
const user = require('./user');
const timeRegistry = require('./time_registry');

const root = gql`
  directive @isAuthenticated on FIELD | FIELD_DEFINITION
  directive @hasRole(role: String) on FIELD | FIELD_DEFINITION

  scalar Date

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

export default [root, user, timeRegistry];
