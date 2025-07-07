const { Room } = require("../models");
const { validationResult } = require("express-validator");

// Create a new room listing
exports.createRoom = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description, price, location } = req.body;
    const room = await Room.create({
      userId: req.user.id,
      title,
      description,
      price,
      location,
    });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Edit a room listing (only by owner)
exports.editRoom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room || room.userId !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Room not found or unauthorized" });
    }
    const { title, description, price, location } = req.body;
    room.title = title || room.title;
    room.description = description || room.description;
    room.price = price || room.price;
    room.location = location || room.location;
    await room.save();
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a room listing (only by owner)
exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room || room.userId !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Room not found or unauthorized" });
    }
    await room.destroy();
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// List/search/filter rooms
exports.listRooms = async (req, res) => {
  try {
    const { location, minPrice, maxPrice } = req.query;
    const where = {};
    if (location) where.location = location;
    if (minPrice) where.price = { ...where.price, $gte: parseFloat(minPrice) };
    if (maxPrice) where.price = { ...where.price, $lte: parseFloat(maxPrice) };
    // TODO: Add date-based filtering in bookingController
    const rooms = await Room.findAll({ where });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
