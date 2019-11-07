const { gql } = require('apollo-server');

module.exports = gql`
enum Role {
  USER
  ADMIN
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  role: Role
  timeRegistries: [TimeRegistry!]!
}

extend type Query {
  users: [User!] @isAuthenticated @hasRole(role: "ADMIN")
  currentUser: User @isAuthenticated
}

extend type Mutation {
  signUp(name: String!, email: String!, password: String!): Token!
  signIn(email: String!, password: String!): Token!
}

type Token {
  token: String!
}
`
