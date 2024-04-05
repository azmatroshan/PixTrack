const mongoose = require("mongoose");

const Stat = mongoose.model(
  "Stat",
  new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    visits: [
        {
            timestamp: String
        }
    ]
  })
);

module.exports = Stat;
