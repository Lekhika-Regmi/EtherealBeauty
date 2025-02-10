const { DataTypes } = require("sequelize");
const sequelize = require("../database/db.config"); // Import Sequelize instance
const Order = require("./orders.model"); // Import Order model
const Product = require("../products/products.model"); // Import Product model
const Vendor = require("../users/vendor/vendor.model"); // Import Vendor model

// Define the OrderItem model
const OrderItem = sequelize.define(
  "OrderItems",
  {
    order_item_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: "order_id",
      },
      onDelete: "CASCADE",
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "product_id",
      },
      onDelete: "CASCADE",
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Vendor,
        key: "vendor_id",
      },
      onDelete: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1, // Ensures quantity > 0
      },
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: false, // No automatic timestamps
    tableName: "OrderItems",
  }
);

// Sync the table
// (async () => {
//   await sequelize.sync({ alter: true });
//   console.log("OrderItems table synced!");
// })();

module.exports = OrderItem;