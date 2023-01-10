'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
    
    }
  }
  
  Message.init({
    chatId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Message',
    freezeTableName: true
  });
  return Message;
};