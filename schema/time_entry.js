import { gql } from 'apollo-server';

module.exports = gql`

"""
TimeEntry representa uma batida de ponto
"""
type TimeEntry {
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
    timeEntryCreated: TimeEntry @isAuthenticated @hasRole(role: "ADMIN")
}

extend type Query {
    """
    Query que retorna todas as batidades de pontos de todos usuários.
    Note que somente administradores podem executar essa query
    """
    timeEntries: [TimeEntry!] @isAuthenticated @hasRole(role: "ADMIN")
    """
    Query que retorna todas as bastidades de pontos do usuário corrente
    """
    myTimeEntries: [TimeEntry!]
}

extend type Mutation {
    """
    Efetua uma batida de ponto para o usuário corrente.
    Note que somente usuários authenticados podem executar essa mutation
    """
    createTimeEntry: TimeEntry! @isAuthenticated
    """
    Apaga uma batida de ponto de qualquer usuário.
    Note que somente administradores podem executar essa mutation
    """
    deleteTimeEntry(id: ID!): Boolean @isAuthenticated @hasRole(role: "ADMIN")
}
`
