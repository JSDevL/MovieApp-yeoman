'use strict';

import mongoose from 'mongoose';

var TheaterEndpointSchema = new mongoose.Schema({
    name: String,
    theater: []
});

export default mongoose.model('theaterdetails', TheaterEndpointSchema);

// {
//   name: String,
//   location: String,
//   screens: Number,
//   seats: Number,
//   //classType: [String]
// }
