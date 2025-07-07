const { Booking, Room } = require("../models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

// Book a room if available for the given dates
exports.bookRoom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { roomId, checkIn, checkOut } = req.body;
    // Check if room exists
    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    // Check for overlapping bookings
    const overlapping = await Booking.findOne({
      where: {
        roomId,
        [Op.or]: [
          {
            checkIn: { [Op.between]: [checkIn, checkOut] },
          },
          {
            checkOut: { [Op.between]: [checkIn, checkOut] },
          },
          {
            checkIn: { [Op.lte]: checkIn },
            checkOut: { [Op.gte]: checkOut },
          },
        ],
      },
    });
    if (overlapping) {
      return res
        .status(400)
        .json({ message: "Room is already booked for these dates" });
    }
    // Create booking
    const booking = await Booking.create({
      userId: req.user.id,
      roomId,
      checkIn,
      checkOut,
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Search available rooms by date range
exports.searchAvailableRooms = async (req, res) => {
  try {
    const { checkIn, checkOut } = req.query;
    if (!checkIn || !checkOut) {
      return res
        .status(400)
        .json({ message: "checkIn and checkOut dates are required" });
    }
    // Find rooms that do NOT have overlapping bookings
    const bookedRoomIds = await Booking.findAll({
      where: {
        [Op.or]: [
          {
            checkIn: { [Op.between]: [checkIn, checkOut] },
          },
          {
            checkOut: { [Op.between]: [checkIn, checkOut] },
          },
          {
            checkIn: { [Op.lte]: checkIn },
            checkOut: { [Op.gte]: checkOut },
          },
        ],
      },
      attributes: ["roomId"],
    });
    const bookedIds = bookedRoomIds.map((b) => b.roomId);
    // Find rooms not in bookedIds
    const availableRooms = await Room.findAll({
      where: {
        id: { [Op.notIn]: bookedIds },
      },
    });
    res.json(availableRooms);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
