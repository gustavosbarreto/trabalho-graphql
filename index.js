import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { AuthDirective } from 'graphql-directive-auth';
import { ForbiddenError, PubSub, ApolloServer } from 'apollo-server';

import schema from './schema';
import models, { sequelize } from './models';
import resolvers from './resolvers';

const getUser = async token => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const pubSub = new PubSub();

const customAuth = AuthDirective({
  authenticateFunc: (ctx) => {
    if (!ctx.user) {
      return false;
    }

    return true;
  },

  checkRoleFunc: (auth, allowedRoles) => {
    const roles = allowedRoles.split(" ");
    if (!roles.includes(auth.user.role)) {
      throw new ForbiddenError('Permission denied');
    }
  }
});

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  schemaDirectives: {
    ...customAuth
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return connection.context;
    } else {
      const tokenWithBearer = req.headers.authorization || ''
      const token = tokenWithBearer.split(' ')[1]
      const user = await getUser(token)


      return {
        models,
        pubSub,
        user
      }
    }
  },
  subscriptions: {
    onConnect: async (params, webSocket) => {
      const tokenWithBearer = params.Authorization || '';
      const token = tokenWithBearer.split(' ')[1];
      const user = await getUser(token);

      return { models, pubSub, user }
    },
  },
});

sequelize.sync().then(async () => {
  server.listen().then((s) => {
    console.log(`Server listening on port ${s.port}`);
  });
});
