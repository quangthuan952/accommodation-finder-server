'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('accounts', 'from', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.addColumn('accounts', 'displayName', {
        type: Sequelize.STRING,
        allowNull: false
      })
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
