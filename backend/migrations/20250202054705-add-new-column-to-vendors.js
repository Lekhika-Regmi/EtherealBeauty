module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the new columns with default value
    await queryInterface.addColumn("Vendors", "govtIssuedId1", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",  // Provide a default value for existing rows
    });

    await queryInterface.addColumn("Vendors", "govtIssuedId2", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",  // Provide a default value for existing rows
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the columns
    await queryInterface.removeColumn("Vendors", "govtIssuedId1");
    await queryInterface.removeColumn("Vendors", "govtIssuedId2");
  },
};
