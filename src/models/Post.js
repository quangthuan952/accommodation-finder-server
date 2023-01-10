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
            Post.belongsTo(models.Account, {foreignKey: 'userId', as: 'user'})

        }
    }

    Post.init({
        title: DataTypes.STRING,
        lane: DataTypes.STRING,
        street: DataTypes.STRING,
        houseNumber: DataTypes.STRING,
        area: DataTypes.FLOAT,
        price: DataTypes.FLOAT,
        deposit: DataTypes.FLOAT,
        province: DataTypes.STRING,
        ward: DataTypes.STRING,
        district: DataTypes.STRING,
        isStayWithHost: DataTypes.INTEGER,
        isPrivateToilet: DataTypes.INTEGER,
        isFurniture: DataTypes.INTEGER,
        images: DataTypes.TEXT,
        video: DataTypes.STRING,
        userId: DataTypes.STRING,
        category: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        specificAddress: DataTypes.STRING,
        status: DataTypes.INTEGER,
        isActive: DataTypes.BOOLEAN,
        type: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};