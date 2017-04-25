'use strict';

import mongoose from 'mongoose';

var TheaterEndpointSchema = new mongoose.Schema({
  state: String,
  city: String
});

export default mongoose.model('theaterdetails', TheaterEndpointSchema);
