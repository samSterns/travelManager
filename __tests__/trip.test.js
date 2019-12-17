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
     
    itinerary = await Itinerary.create([
      {
        tripId: trip._id,
        woeId: 123, 
        dayOf: 'Monday',
        typeOfActivity: 'culture'
            
      },
      {
        tripId: trip._id,
        woeId: 123, 
        dayOf: 'Tuesday',
        typeOfActivity: 'outdoors'
      }
    ]);
  });
  
  afterAll(() => {
    return mongoose.connection.close();
  });
    
  it('creates a trip', () => {
    return request(app)
      .post('/api/v1/trips')
      .send({
        place: 'Moombasa',
        numberOfDays: 7,
        isSolo: true
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          place: 'Moombasa',
          numberOfDays: 7,
          isSolo: true,
          __v: 0
        });
      });
  });

  it('gets all trips', async() => {
    const trips = await Trip.create([
      { place: 'Moombasa', numberOfDays: 3, isSolo: true },
      { place: 'BD', numberOfDays: 4, isSolo: true },
      { place: 'PDX', numberOfDays: 5, isSolo: true }
    ]);

    return request(app)
      .get('/api/v1/trips')
      .then(res => {
        trips.forEach(trip => {
          expect(res.body).toContainEqual({
            _id: trip._id.toString(),
            name: trip.name
          });
        });
      });
  });

  it('gets a trip by id', async() => {
    return request(app)
      .get(`/api/v1/trips/${trip.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          place: 'Moombasa',
          numberOfDays: 7,
          isSolo: true,
          __v: 0
        });
      });
  });

  it('updates a trip by id', async() => {
    return request(app)
      .patch(`/api/v1/trips/${trip._id}`)
      .send({ place: 'Moombasa, Kenya' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          place: 'Moombasa, Kenya',
          numberOfDays: 7,
          isSolo: true, dfss
          __v: 0
        });
      });
  });

  it('deletes a trip by id', async() => {
    return request(app)
      .delete(`/api/v1/trips/${trip._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          place: 'Moombasa',
          numberOfDays: 7,
          isSolo: true,
          __v: 0
        });
        return Trip.find();
      })
      .then(trip => {
        expect(trip).toHaveLength(0);
      });
  });

});

// itinerary: JSON.parse(JSON.stringify(itinerary)),
//tripId: JSON.parse(JSON.stringify(trip)),
