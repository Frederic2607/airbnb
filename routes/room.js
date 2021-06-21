const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();

const Room = require("../models/Room");

// Publish room
router.post("/room/publish", isAuthenticated, async (req, res) => {
  try {
    if (
      req.fields.title &&
      req.fields.price &&
      req.fields.description &&
      req.fields.location
    ) {
      const newRoom = new Room({
        title: req.fields.title,
        description: req.fields.description,
        price: req.fields.price,
        owner: req.user,
        location: [req.fields.location.lat, req.fields.location.lng],
      });
      await newRoom.save();
      res.status(200).json(newRoom);
    } else {
      res.status(400).json({ message: "Missing fields !" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/rooms/:id", async (req, res) => {
  try {
    const rooms = await Room.findById(req.params.id).populate(
      "owner",
      "account"
    );
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
