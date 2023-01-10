'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
    }
  }
  
  Chat.init({
    userId1: DataTypes.INTEGER,
    userId2: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};