'use strict';

import mongoose from 'mongoose';

var CitySchema = new mongoose.Schema({
  name: String,
  theater: [String]
});

export default mongoose.model('citiesdetails', CitySchema);
