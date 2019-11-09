const { gql } = require('apollo-server');

module.exports = gql`
"""
Tipos de papéis de usuários
"""
enum Role {
  "Usuário comum"
  USER
  "Administrador"
  ADMIN
}

"User representa um usuário"
type User {
  id: ID!
  "Nome do usuário"
  name: String!
  "E-mail do usuário"
  email: String!
  "Senha de acesso do usuário"
  password: String!
  "Papel do usuário"
  role: Role
  "Batidas de pontos do usuário"
  timeRegistries: [TimeRegistry!]!
}

extend type Query {
  """
  Query que retorna todos os usuários
  Note que somente administradores podem executar essa query
  """
  users: [User!] @isAuthenticated @hasRole(role: "ADMIN")
  "Retorna o usuário corrente que está autenticado"
  currentUser: User @isAuthenticated
}

extend type Mutation {
  "Mutation para registro de novos usuários"
  signUp(name: String!, email: String!, password: String!): Token!
  "Mutation para login de usuários registrados"
  signIn(email: String!, password: String!): Token!
}

"Token de autenticação"
type Token {
  token: String!
}
`
