'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      
    }
  }
  
  Question.init({
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    topic: DataTypes.INTEGER,
    questionerId: DataTypes.STRING,
    respondentId: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    status: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};