'use strict';

import mongoose from 'mongoose';

var MovieTheaterEndpointSchema = new mongoose.Schema({
  city: String,
  movie: String,
  theater: String,
  dates: [String],
  times: [String]
});

export default mongoose.model('movietheaterdetails', MovieTheaterEndpointSchema);
