require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip');
const Itinerary = require('../lib/models/Itinerary');

describe('trip routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let trip;
  let itinerary;

  beforeEach(async() => {
    trip = await Trip.create({
      place: 'Moombasa',
      numberOfDays: 7,
      isSolo: true
    });

    itinerary = await Itinerary.create({
      tripId: trip._id,
      woeId: 123, 
      dayOf: 'Monday',
      typeOfActivity: 'culture'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an itinerary', () => {
    return request(app)
      .post('/api/v1/itinerary')
      .send({
        tripId: trip._id,
        woeId: 123,
        dayOf: 'Monday',
        typeOfActivity: 'culture'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripId: trip._id.toString(),
          woeId: expect.any(Number),
          dayOf: expect.any(String),
          typeOfActivity: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all itinerary', async() => {
    const itinerary = await Itinerary.create([
      { tripId: trip._id, woeId: 123, dayOf: 'Monday', typeOfActivity: 'culture' }
      
    ]);

    return request(app)
      .get('/api/v1/itinerary')
      .then(res => {
        itinerary.forEach(itinerary => {
          expect(res.body).toContainEqual({
            _id: itinerary._id.toString(),
            tripId: trip.id, 
            woeId: 123, 
            dayOf: 'Monday', 
            typeOfActivity: 'culture',
            __v: 0
          });
        });
      });
  });

  it('gets an itinerary by id', async() => {
    return request(app)
      .get(`/api/v1/itinerary/${itinerary._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripId: JSON.parse(JSON.stringify(trip)),
          dayOf: expect.any(String),
          woeId: expect.any(Number),
          typeOfActivity: expect.any(String),
          __v: 0
        });
      });
  });

  it('updates an itinerary by id', async() => {
    return request(app)
      .patch(`/api/v1/itinerary/${itinerary._id}`)
      .send({ typeOfActivity: 'outdoors' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripId: expect.any(String),
          dayOf: expect.any(String),
          woeId: expect.any(Number),
          typeOfActivity: 'outdoors',
          __v: 0
        });
      });
  });

  it('deletes an itinerary by id', async() => {
    return request(app)
      .delete(`/api/v1/itinerary/${itinerary._id}`)
      .send({ typeOfActivity: 'outdoors' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripId: expect.any(String),
          woeId: expect.any(Number),
          dayOf: expect.any(String),
          typeOfActivity: 'culture',
          __v: 0
        });
      });
  });


});
