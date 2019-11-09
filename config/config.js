require('dotenv-defaults').config();

module.exports = {
    development: {
        dialect: "sqlite",
        storage: process.env.DB_FILE,
        logging: true
    }
}
