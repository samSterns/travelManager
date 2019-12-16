const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  tripId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  dayOf: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  typeOfActivity: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Itinerary', schema);
