const express = require("express");
const { body } = require("express-validator");
const roomController = require("../controllers/roomController");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// List/search/filter rooms (public)
router.get("/", roomController.listRooms);

// Create a new room (authenticated)
router.post(
  "/",
  authenticateToken,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("location").notEmpty().withMessage("Location is required"),
  ],
  roomController.createRoom
);

// Edit a room (authenticated, owner only)
router.put(
  "/:id",
  authenticateToken,
  [
    body("title").optional().notEmpty(),
    body("description").optional().notEmpty(),
    body("price").optional().isFloat({ min: 0 }),
    body("location").optional().notEmpty(),
  ],
  roomController.editRoom
);

// Delete a room (authenticated, owner only)
router.delete("/:id", authenticateToken, roomController.deleteRoom);

module.exports = router;
