const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const User = require("./User");
const Room = require("./Room");

// Define the Booking model
const Booking = sequelize.define("Booking", {
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
  roomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Room,
      key: "id",
    },
  },
  checkIn: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  checkOut: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

// Set up associations
Booking.belongsTo(User, { foreignKey: "userId" });
Booking.belongsTo(Room, { foreignKey: "roomId" });
User.hasMany(Booking, { foreignKey: "userId" });
Room.hasMany(Booking, { foreignKey: "roomId" });

module.exports = Booking;
