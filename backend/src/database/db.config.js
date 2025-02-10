// const { Sequelize } = require('sequelize');
// require('dotenv').config(); // Load environment variables

// const sequelize = new Sequelize({
//   dialect: 'mysql', // Change this to 'mysql' instead of 'mysql2'
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   logging: false, // Optional, can disable logging if you don't need it
//   pool: {
//     max: 5,  // Adjust based on your needs
//     min: 0,
//     idle: 10000,
//   },
// });

// module.exports = sequelize;
const { Sequelize } = require("sequelize");

// Initialize Sequelize with the correct database name
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./etherealbeauty.db", // Updated to reflect the correct database name
});

sequelize.sync({ alter: false, force: false })
  .then(() => console.log("Database synced without altering tables"))
  .catch((err) => console.error("Error syncing database:", err));


module.exports = sequelize;


