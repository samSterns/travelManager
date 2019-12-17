mongoose = require('mongoose');
const Trip = require('./Trip');

describe('Trip Model', () => {
  it('has a required place', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();
        
    expect(errors.place.message).toEqual('Path `place` is required.');
  });
  it('has a required numberOfDays', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();
        
    expect(errors.numberOfDays.message).toEqual('Path `numberOfDays` is required.');
  });

});
