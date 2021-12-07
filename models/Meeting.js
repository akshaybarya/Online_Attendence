const Mongoose = require("mongoose");

const MeetingSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  meetings: {
    type: Array,
    required: true,
  },
});

module.exports = Meeting = Mongoose.model("subject", MeetingSchema);
