import config from '../config/config.js';

const Sequelize = require('sequelize');

let sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);

const models = {
    User: sequelize.import('./user'),
    TimeEntry: sequelize.import('./time_entry')
};

export { sequelize }
export default models;
