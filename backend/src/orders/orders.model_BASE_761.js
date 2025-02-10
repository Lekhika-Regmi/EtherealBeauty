const { DataTypes } = require("sequelize");
const sequelize = require("../database/db.config"); // Import Sequelize instance
const Customer = require("../users/customer/customer.model"); // Assuming Customer model exists

// Define the Order model
const Order = sequelize.define(
  "Orders",
  {
    order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "customer_id",
      },
      onDelete: "CASCADE",
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM("eSewa", "Khalti", "Cash On Delivery"),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "processing", "delivered"),
      allowNull: false,
      defaultValue: "pending",
    
    },

  },
  {
    timestamps: false, // Disabling Sequelize's automatic timestamps
    tableName: "Orders",
  }
);

// Sync the table
(async () => {
  await sequelize.sync({ alter: false });
  console.log("Orders table synced!");
})();

module.exports = Order;
