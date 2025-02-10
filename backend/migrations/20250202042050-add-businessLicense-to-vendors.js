module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Vendors", "businessLicense", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Vendors", "govtIssuedId", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Vendors", "businessLicense");
    await queryInterface.removeColumn("Vendors", "govtIssuedId");
  },
};
