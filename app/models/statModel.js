const mongoose = require("mongoose");

const Stat = mongoose.model(
  "Stat",
  new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    subject: String,
    userId: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    visits: [
        {
          timestamp: {
            type: Date,
            default: Date.now()
          },
          client_ip: String,
          path: String,
          user_agent: String
        }
    ]
  })
);

module.exports = Stat;
