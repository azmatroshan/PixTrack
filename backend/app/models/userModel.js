const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    emails: [
      {
        subject: String,
        statId: String,
      }
    ]
  })
);

module.exports = User;
