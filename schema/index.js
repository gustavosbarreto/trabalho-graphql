const { gql } = require('apollo-server');
const user = require('./user');
const timeEntry = require('./time_entry');

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

export default [root, user, timeEntry];
