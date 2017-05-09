'use strict';

import mongoose from 'mongoose';

var PaymentEndpointSchema = new mongoose.Schema({
  seatNos: [String]
});

export default mongoose.model('paymentdetails', PaymentEndpointSchema);
