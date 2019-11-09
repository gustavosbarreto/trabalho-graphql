import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { AuthenticationError } from 'apollo-server';

const createToken = async (user, secret, expiresIn) => {
	const { id, email, role } = user;

	return await jwt.sign({ id, email, role }, secret, {
		expiresIn
	});
};

export default {
	User: {
		timeEntries: async (parent, args, context, info) => {
			return await parent.getTimeEntries();
		}
	},

	Query: {
		users: async (parent, args, { models }) => {
			return await models.User.findAll();
		},

		currentUser: async (parent, args, { models, user }) => {
			if (!user) {
				return null
			}

			return await models.User.findById(user.id);
		}
	},

	Mutation: {
		signUp: async (parent, { name, email, password }, { models }) => {
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await models.User.create({ name, email, password: hashedPassword, role: 'USER' });

			return { token: createToken(user, process.env.SECRET, '30d') }
		},

		signIn: async (parent, { email, password }, { models }) => {
			const user = await models.User.findByEmail(email)

			if (!user) {
				throw new AuthenticationError('Authentication failed');
			}

			const passwordMatch = await bcrypt.compare(password, user.password);
			if (!passwordMatch) {
				throw new AuthenticationError('Authentication failed');
			}

			return { token: createToken(user, process.env.SECRET, '30d') }
		}
	}
}
