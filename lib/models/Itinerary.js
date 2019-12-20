const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  tripId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  woeId:{
    type: Number,
    required: true
  },
  dayOf: {
    type: String,
    required: true
  },
  typeOfActivity: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Itinerary', schema);
