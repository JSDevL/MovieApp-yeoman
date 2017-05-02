'use strict';

import mongoose from 'mongoose';

var TheaterEndpointSchema = new mongoose.Schema({
    name: String,
    location: String
});

export default mongoose.model('theaterdetails', TheaterEndpointSchema);
