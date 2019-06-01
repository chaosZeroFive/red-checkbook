const mongoose = require("mongoose");

const PlanSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "Mission"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("plan", PlanSchema);
