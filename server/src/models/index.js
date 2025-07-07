const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false, // Disable SQL query logging
  }
);

const User = require("./User");
const Room = require("./Room");
const Booking = require("./Booking");

module.exports = { sequelize, User, Room, Booking };
