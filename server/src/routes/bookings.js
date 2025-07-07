const express = require("express");
const { body } = require("express-validator");
const bookingController = require("../controllers/bookingController");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// Book a room (authenticated)
router.post(
  "/",
  authenticateToken,
  [
    body("roomId").isInt().withMessage("roomId is required"),
    body("checkIn").isISO8601().withMessage("Valid checkIn date is required"),
    body("checkOut").isISO8601().withMessage("Valid checkOut date is required"),
  ],
  bookingController.bookRoom
);

// Search available rooms by date range (public)
router.get("/available", bookingController.searchAvailableRooms);

module.exports = router;
