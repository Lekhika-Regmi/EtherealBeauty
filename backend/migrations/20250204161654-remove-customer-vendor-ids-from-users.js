module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the 'vendor_id' and 'customer_id' columns from the 'Users' table
    await queryInterface.removeColumn("Users", "vendor_id");
    await queryInterface.removeColumn("Users", "customer_id");
  },

  down: async (queryInterface, Sequelize) => {
    // Optionally, you can define how to add them back in case of a rollback (this is up to your requirements)
    await queryInterface.addColumn("Users", "vendor_id", {
      type: Sequelize.INTEGER,
      references: { model: "Vendors", key: "id" },
      allowNull: true,
    });

    await queryInterface.addColumn("Users", "customer_id", {
      type: Sequelize.INTEGER,
      references: { model: "Customers", key: "id" },
      allowNull: true,
    });
  },
};
