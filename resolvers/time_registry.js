import { EVENTS } from '../subscription';

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
        createTimeRegistry: async (parent, args, { pubSub, models, user }) => {
            const timeRegistry = await models.TimeRegistry.create({ userId: user.id });

            await timeRegistry.reload({ include: [models.User] });

            pubSub.publish(EVENTS.TIME_REGISTRY.CREATED, {
                timeRegistryCreated: timeRegistry
            });

            return timeRegistry;
        },

        deleteTimeRegistry: async (parent, { id }, { models }) => {
            const timeRegistry = await models.TimeRegistry.findById(id);
            await timeRegistry.destroy();
            return true;
        }
    },

    Subscription: {
        timeRegistryCreated: {
            subscribe: (parent, args, { pubSub }) => {
                return pubSub.asyncIterator(EVENTS.TIME_REGISTRY.CREATED);
            }
        },
    },
}
