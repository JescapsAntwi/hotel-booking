const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const User = require("./User");

// Define the Room model
const Room = sequelize.define("Room", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Additional fields can be added as needed
});

// Set up association
Room.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Room, { foreignKey: "userId" });

module.exports = Room;
