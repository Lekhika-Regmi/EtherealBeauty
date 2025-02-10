const { Sequelize } = require("sequelize");
const path = require("path");

module.exports = {
  development: {
    dialect: "sqlite",
    storage: path.resolve(__dirname, "../etherealbeauty.db"), // Use absolute path to the SQLite file
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:", // SQLite in-memory for tests
  },
  production: {
    dialect: "sqlite",
    storage: path.resolve(__dirname, "../etherealbeauty.db"), // Same for production
  },
};
