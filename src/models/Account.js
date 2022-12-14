'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
        static associate(models) {
           Account.hasOne(models.User, {foreignKey: 'accountId', as: 'userData'})
           Account.hasOne(models.Post, {foreignKey: 'userId', as: 'user'})
        }
    }

    Account.init({
        username: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        displayName: DataTypes.STRING,
        email: DataTypes.STRING,
        avatar: DataTypes.STRING,
        imageCover: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
        role: DataTypes.INTEGER,
        from: DataTypes.STRING,
        uid: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Account',
    });
    return Account;
};