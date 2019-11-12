import { EVENTS } from '../subscription';

export default {
    TimeEntry: {
        user: async (parent, args, context, info) => {
            return parent.User;
        }
    },

    Query: {
        timeEntries: async (parent, args, { user, models }) => {
            if (user.role == 'ADMIN') {
                return await models.TimeEntry.findAll({ include: [{ model: models.User }] });
            } else {
                const me = await models.User.findById(user.id);
                return await me.getTimeEntries({ include: [{ model: models.User }] });
            }
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
