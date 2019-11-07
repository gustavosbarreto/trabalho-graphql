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
}

extend type Query {
  users: [User!]
}
`
