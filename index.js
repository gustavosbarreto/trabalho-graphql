import { ApolloServer } from 'apollo-server';
import schema from './schema';
import models, { sequelize } from './models';
import resolvers from './resolvers';

const server = new ApolloServer({
    introspection: true,
    playground: true,
    typeDefs: schema,
    resolvers,
    context: { models }
});

sequelize.sync().then(async () => {
    server.listen().then((s) => {
	console.log(`Server listening on port ${s.port}`);
    });
});
