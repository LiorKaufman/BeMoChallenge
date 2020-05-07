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

module.exports = Content = mongoose.model('content', ContentSchema);
