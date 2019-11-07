import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class User extends Model {}

    User.init({
	name: DataTypes.STRING,
	email: DataTypes.STRING,
	password: DataTypes.STRING,
	role: DataTypes.STRING
    }, { sequelize });
    
    return User;
}
