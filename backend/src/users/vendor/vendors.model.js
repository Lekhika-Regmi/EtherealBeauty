const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db.config");
const User = require("../users.model"); // Import User model for association

const Vendor = sequelize.define(
  "Vendor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    vendorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessRN: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    businessAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessLicense: {
      type: DataTypes.STRING,
      allowNull: false, // Store file path
    },
    govtIssuedIds: {
      type: DataTypes.JSON, // Store file paths as an array
      allowNull: false,
    },
    termsAccepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

// Define associations
Vendor.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Vendor;
