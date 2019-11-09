import { gql } from 'apollo-server';

module.exports = gql`

"""
TimeRegistry representa uma batida de ponto
"""
type TimeRegistry {
    id: ID!
    "ID do usuário que efetuou a batida de ponto"
    userId: ID!
    "Usuário que efetuou a batida de ponto"
    user: User!
    "Data em quem a batida de ponto foi efetuada"
    createdAt: Date!
}

extend type Subscription {
    """
    Evento que é disparado quando uma batida é efetuada.
    Note que somente administradores podem subscrever a este evento
    """
    timeRegistryCreated: TimeRegistry @isAuthenticated @hasRole(role: "ADMIN")
}

extend type Query {
    """
    Query que retorna todas as batidades de pontos de todos usuários.
    Note que somente administradores podem executar essa query
    """
    timeRegistries: [TimeRegistry!] @isAuthenticated @hasRole(role: "ADMIN")
}

extend type Mutation {
    """
    Efetua uma batida de ponto para o usuário corrente.
    Note que somente usuários authenticados podem executar essa mutation
    """
    createTimeRegistry: TimeRegistry! @isAuthenticated
    """
    Apaga uma batida de ponto de qualquer usuário.
    Note que somente administradores podem executar essa mutation
    """
    deleteTimeRegistry(id: ID!): Boolean @isAuthenticated @hasRole(role: "ADMIN")
}
`
