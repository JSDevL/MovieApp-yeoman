'use strict';

import mongoose from 'mongoose';

var MovieTheaterEndpointSchema = new mongoose.Schema({
  cityName: String,
  movie: [{
    name: String,
    theater: [{
      name: String,
      dates: String,
      times: String
    }]
  }]
});

export default mongoose.model('movietheaterdetails', MovieTheaterEndpointSchema);
