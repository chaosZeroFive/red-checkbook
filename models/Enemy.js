const mongoose = require("mongoose");

const EnemySchema = mongoose.Schema({
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "plans"
  },
  name: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("enemy", EnemySchema);
