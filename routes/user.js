const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

// Sign_up route
router.post("/user/sign_up", async (req, res) => {
  try {
    const { email, password, username, name, description } = req.fields;

    const user = await User.findOne({ email: email });
    if (!user) {
      if (email && password && username && name && description) {
        // Générer le salt, hash et token
        const salt = uid2(16);
        const hash = SHA256(salt + req.fields.password).toString(encBase64);
        const token = uid2(64);
        console.log(hash);
        // New user
        const newUser = new User({
          email: email,
          account: {
            name: name,
            username: username,
            description: description,
          },
          token: token,
          hash: hash,
          salt: salt,
        });
        await newUser.save();
        res.status(200).json({
          _id: newUser._id,
          token: newUser.token,
          email: newUser.email,
          account: {
            name: name,
            username: username,
            description: description,
          },
        });
      } else {
        res.status(400).json({ message: "Missing parameter(s)" });
      }
    } else {
      res.status(400).json({ message: "This email already has an account" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login route
router.post("/user/log_in", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.fields.email });

    if (user) {
      const newHash = SHA256(user.salt + req.fields.password).toString(
        encBase64
      );
      if (newHash === user.hash) {
        res.status(200).json({
          _id: user._id,
          token: user.token,
          account: user.account,
        });
      } else {
        res.status(400).json({ message: "Unauthorized" });
      }
    } else {
      res.status(400).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
