const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  maintext: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('content', ContentSchema);
