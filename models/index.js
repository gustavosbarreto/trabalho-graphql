const Sequelize = require('sequelize');

let sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite3',
    logging: true
});

const models = {
    User: sequelize.import('./user')
};

export { sequelize }
export default models;
