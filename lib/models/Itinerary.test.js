const mongoose = require('mongoose');
const Itinerary = require('./Itinerary');

describe('Itinerary Model', () => {
  it('has a required tripId', () => {
    const itinerary = new Itinerary();
    const { errors } = itinerary.validateSync();
    
    expect(errors.tripId.message).toEqual('Path `tripId` is required.');
  });

  it('has a required woeId', () => {
    const itinerary = new Itinerary();
    const { errors } = itinerary.validateSync();
    
    expect(errors.woeId.message).toEqual('Path `woeId` is required.');
  });

  it('has a required dayOf', () => {
    const itinerary = new Itinerary();
    const { errors } = itinerary.validateSync();
    
    expect(errors.dayOf.message).toEqual('Path `dayOf` is required.');
  });

  it('has a required typeOfActivity', () => {
    const itinerary = new Itinerary();
    const { errors } = itinerary.validateSync();
    
    expect(errors.typeOfActivity.message).toEqual('Path `typeOfActivity` is required.');
  });
});
