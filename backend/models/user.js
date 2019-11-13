import { Model } from 'sequelize';
import { TimeEntry } from './time_entry';


export default (sequelize, DataTypes) => {
    class User extends Model { }

    User.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING
    }, { sequelize });

    User.associate = models => {
        User.hasMany(models.TimeEntry);
        models.TimeEntry.belongsTo(User);
    };

    User.findById = async id => {
        return await User.findOne({ where: { id: id } });
    }

    User.findByEmail = async email => {
        return await User.findOne({ where: { email: email } });
    }

    const TimeEntry = sequelize.import('./time_entry');

    User.associate({ TimeEntry });

    return User;
}
