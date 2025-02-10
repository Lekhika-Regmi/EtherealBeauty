const sequelize = require("../database/db.config"); 
const User = require("./users.model");  
const Customer = require("./customer/customers.model.js");
const Vendor = require("./vendor/vendors.model.js");


// Define associations
User.hasOne(Customer, { foreignKey: "user_id" });  
User.hasOne(Vendor, { foreignKey: "user_id" });    

Customer.belongsTo(User, { foreignKey: "user_id" });  
Vendor.belongsTo(User, { foreignKey: "user_id" });    

const db = { sequelize, User, Customer, Vendor };

module.exports = db;
