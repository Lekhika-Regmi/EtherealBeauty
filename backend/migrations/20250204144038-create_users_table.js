module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("User", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM("customer", "vendor", "superadmin"),
        allowNull: false,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: { model: "Customers", key: "id" },
        onDelete: "CASCADE",
      },
      vendor_id: {
        type: Sequelize.INTEGER,
        references: { model: "Vendors", key: "id" },
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
