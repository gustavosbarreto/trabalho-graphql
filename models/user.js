import { Model } from 'sequelize';
import { TimeRegistry } from './time_registry';


export default (sequelize, DataTypes) => {
    class User extends Model { }

    User.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING
    }, { sequelize });

    User.associate = models => {
        User.hasMany(models.TimeRegistry);
        models.TimeRegistry.belongsTo(User);
    };

    User.findById = async id => {
        return await User.findOne({ where: { id: id } });
    }

    User.findByEmail = async email => {
        return await User.findOne({ where: { email: email } });
    }

    const TimeRegistry = sequelize.import('./time_registry');

    User.associate({ TimeRegistry });

    return User;
}
