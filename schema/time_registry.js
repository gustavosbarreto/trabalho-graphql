import { gql } from 'apollo-server';

module.exports = gql`
type TimeRegistry {
    id: ID!
    userId: ID!
    user: User!
    createdAt: Date!
}

extend type Query {
    timeRegistries: [TimeRegistry!] @isAuthenticated @hasRole(role: "ADMIN")
}

extend type Mutation {
    createTimeRegistry: TimeRegistry!
    deleteTimeRegistry(id: ID!): Boolean @isAuthenticated @hasRole(role: "ADMIN")
}
`
