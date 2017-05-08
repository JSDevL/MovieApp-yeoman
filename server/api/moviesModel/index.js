'use strict';

import mongoose from 'mongoose';

var MoviesModelSchema = new mongoose.Schema({
  name: String,
  genre: String,
  date: String,
  poster: String
});

export default mongoose.model('moviedetails', MoviesModelSchema);
