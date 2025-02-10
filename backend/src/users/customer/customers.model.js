const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db.config");
const User = require("../users.model");

const Customer = sequelize.define("Customer", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_no: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
  }
}, {
  timestamps: true,
});
Customer.belongsTo(User, { foreignKey: 'user_id' });


module.exports = Customer;
