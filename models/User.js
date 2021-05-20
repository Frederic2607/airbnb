const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
    select: true,
  },
  account: {
    name: {
      required: true,
      type: String,
      select: true,
    },
    username: {
      required: true,
      type: String,
      select: true,
    },
    description: {
      required: true,
      type: String,
      select: true,
    },
  },
  token: {
    type: String,
    select: true,
  },
  hash: {
    type: String,
    select: false,
  },
  salt: {
    type: String,
    select: false,
  },
});

module.exports = User;
