'use strict';

import mongoose from 'mongoose';

var MovieEndpointSchema = new mongoose.Schema({
  title: String,
  genre: String,
  date: String,
  poster: String,
  plot: String,
  directors: [String],
  producers: [String],
  language: String,
  runtime: String,
  avgRating: Number,
  rating: [{
    userName: String,
    hasRated: Boolean
  }]
});

export default mongoose.model('moviedetails', MovieEndpointSchema);
