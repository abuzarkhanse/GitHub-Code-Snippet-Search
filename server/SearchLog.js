const mongoose = require('mongoose');

const searchLogSchema = new mongoose.Schema({
  query: String,
  language: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SearchLog', searchLogSchema);
