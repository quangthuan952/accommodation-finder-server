'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {

      // title: DataTypes.STRING,
      // lane: DataTypes.STRING,
      // street: DataTypes.STRING,
      // houseNumber: DataTypes.STRING,
      // area: DataTypes.FLOAT,
      // price: DataTypes.FLOAT,
      // deposit: DataTypes.FLOAT,
      // province: DataTypes.STRING,
      // subDistrict: DataTypes.STRING,
      // isStayWithHost: DataTypes.INTEGER,
      // isPrivateToilet: DataTypes.INTEGER,
      // isFurniture: DataTypes.INTEGER,
      // images: DataTypes.Sequelize.JSON,
      // videos: DataTypes.STRING,
      // category: DataTypes.INTEGER,
      // description: DataTypes.TEXT,
      // specificAddress: DataTypes.STRING,
      // status: DataTypes.INTEGER,
      // isActive: DataTypes.BOOLEAN,
      // type: DataTypes.INTEGER,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lane: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      houseNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      area: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      deposit: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      province: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ward: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      district: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isStayWithHost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isPrivateToilet: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isFurniture: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      images: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      video: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      specificAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }, updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  }, async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};