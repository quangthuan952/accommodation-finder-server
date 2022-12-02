'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Post.init({
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        content: DataTypes.TEXT,
        thumbnail: DataTypes.STRING,
        address: DataTypes.STRING,
        price: DataTypes.DOUBLE,
        area: DataTypes.STRING,
        furniture: DataTypes.STRING,
        status: DataTypes.INTEGER,
        isActive: DataTypes.BOOLEAN,
        type: DataTypes.INTEGER,
        category: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};