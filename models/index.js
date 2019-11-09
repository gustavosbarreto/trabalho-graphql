import config from '../config/config.js';

const Sequelize = require('sequelize');

let sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);

const models = {
    User: sequelize.import('./user'),
    TimeRegistry: sequelize.import('./time_registry')
};

export { sequelize }
export default models;
