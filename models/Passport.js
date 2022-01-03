const mongoose = require("mongoose");

const PassportSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
 
});

const Passport = mongoose.model("Passport", PassportSchema);
module.exports = Passport;
