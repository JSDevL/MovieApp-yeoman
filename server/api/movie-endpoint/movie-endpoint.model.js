'use strict';

import mongoose from 'mongoose';

var MovieEndpointSchema = new mongoose.Schema({
  name: String,
  genre: String,
  date: String,
  poster: String
});

export default mongoose.model('moviedetails', MovieEndpointSchema);


// name: String,
// genre: String,
// date: String,
// poster: String,
// plot: String,
// directors: [String],
// language: String,
// runtime: Number,
// rating: {
//   userName: String,
//   hasRated: Boolean
// }
