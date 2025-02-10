const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

const sequelize = new Sequelize({
  dialect: 'mysql', // Change this to 'mysql' instead of 'mysql2'
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false, // Optional, can disable logging if you don't need it
  pool: {
    max: 5,  // Adjust based on your needs
    min: 0,
    idle: 10000,
  },
});

module.exports = sequelize;

