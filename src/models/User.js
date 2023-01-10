'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Account, {foreignKey: 'accountId', as: 'userData'})
        }
    }

    User.init({
        address: DataTypes.TEXT,
        balance: DataTypes.FLOAT,
        accountId: DataTypes.INTEGER,
        bio: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};