const { DataTypes } = require("sequelize");
const sequelize = require("../database/db.config"); // Adjust the path as needed

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("customer", "vendor", "superadmin"),
    allowNull: false,
  },
  
}, {
  tableName:"Users",
  timestamps: true,

});

module.exports = User;
