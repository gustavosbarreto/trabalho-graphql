import { EVENTS } from '../subscription';

export default {
    TimeEntry: {
        user: async (parent, args, context, info) => {
            return parent.User;
        }
    },

    Query: {
        timeEntries: async (parent, args, { models }) => {
            return await models.TimeEntry.findAll();
        },

        myTimeEntries: async (parent, args, { user, models }) => {
            const me = await models.User.findById(user.id);
            return await me.getTimeEntries();
        }
    },

    Mutation: {
        createTimeEntry: async (parent, args, { pubSub, models, user }) => {
            const timeEntry = await models.TimeEntry.create({ userId: user.id });

            await timeEntry.reload({ include: [models.User] });

            pubSub.publish(EVENTS.TIME_ENTRY.CREATED, {
                timeEntryCreated: timeEntry
            });

            return timeEntry;
        },

        deleteTimeEntry: async (parent, { id }, { models }) => {
            const timeEntry = await models.TimeEntry.findById(id);
            await timeEntry.destroy();
            return true;
        }
    },

    Subscription: {
        timeEntryCreated: {
            subscribe: (parent, args, { pubSub }) => {
                return pubSub.asyncIterator(EVENTS.TIME_ENTRY.CREATED);
            }
        },
    },
}
