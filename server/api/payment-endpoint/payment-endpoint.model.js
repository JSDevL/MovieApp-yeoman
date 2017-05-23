'use strict';

import mongoose from 'mongoose';

var PaymentEndpointSchema = new mongoose.Schema({
  userName: String,
  movieName: String,
  theaterName: String,
  classType: String,
  seatNos: [String],
  date: String,
  time: String
});

export default mongoose.model('paymentdetails', PaymentEndpointSchema);
