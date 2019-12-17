const { Router } = require('express');
const Trip = require('../models/Trip');
const Itinerary = require('../models/Itinerary');

module.exports = Router()
  .post('/', (req, res) => {
    Trip
      .create(req.body)
      .then(trip => res.send(trip));
  })

  .get('/', (req, res) => {
    Trip
      .find()
      .select({ name: true })
      .then(trips => res.send(trips));
  })

  .get('/:id', (req, res) => {
    Promise.all([
      Trip.findById(req.params.id),
      Itinerary.find({ tripId: req.params.id })
    ])
      .then(([trip, itinerary]) => res.send({ ...trip.toJSON(), itinerary }));
  })

  .patch('/:id', (req, res) => {
    Trip
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(trip => res.send(trip));
  })

  .delete('/:id', (req, res) => {
    Promise.all([
      Trip.findByIdAndDelete(req.params.id),
      Itinerary.deleteMany({ tripId: req.params.id })
    ])
      .then(([trip]) => res.send(trip));
  });
