const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },
  account: {
    name: {
      required: true,
      type: String,
    },
    username: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
  },
  token: {
    type: String,
  },
  hash: {
    type: String,
  },
  salt: {
    type: String,
  },
});

module.exports = User;
