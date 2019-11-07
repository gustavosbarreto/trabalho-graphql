export default {
    TimeRegistry: {
        user: async (parent, args, context, info) => {
            return parent.User;
        }
    },

    Query: {
        timeRegistries: async (parent, args, { models }) => {
            return await models.TimeRegistry.findAll();
        }
    },

    Mutation: {
        createTimeRegistry: async (parent, { }, { models, user }) => {
            const timeRegistry = await models.TimeRegistry.create({ userId: user.id });
            return timeRegistry.reload({ include: [models.User] });
        },

        deleteTimeRegistry: async (parent, { id }, { models }) => {
            const timeRegistry = await models.TimeRegistry.findById(id);
            await timeRegistry.destroy();
            return true;
        }
    }
}
