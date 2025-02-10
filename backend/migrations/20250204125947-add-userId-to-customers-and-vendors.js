'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add userId column to customers table
    await queryInterface.addColumn('customers', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users', // Name of the users table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // or 'CASCADE' based on your requirement
    });

    // Add userId column to vendors table
    await queryInterface.addColumn('vendors', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users', // Name of the users table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // or 'CASCADE' based on your requirement
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove userId column from customers table
    await queryInterface.removeColumn('customers', 'userId');

    // Remove userId column from vendors table
    await queryInterface.removeColumn('vendors', 'userId');
  }
};
