const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('accommodation-finder', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    "logging": false
});

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const httpCodes = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    TOKEN_EXPIRED: 409,
    UNKNOWN_ERROR: 520,
    UNAUTHORIZED: 401
}

const serverSettings = {
    port: process.env.PORT || 8006,
    basePath: process.env.BASE_PATH || ''
}

module.exports = {
    connectDatabase,
    httpCodes,
    serverSettings
}

