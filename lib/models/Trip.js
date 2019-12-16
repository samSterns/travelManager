const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  place:{
    type: String,
    required: true
  },
  numberOfDays: {
    type: Number,
    required: true,
    min: 2,
    max: 30
  },
  isSolo: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Trip', schema);
