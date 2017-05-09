'use strict';

import mongoose from 'mongoose';

var PaymentEndpointSchema = new mongoose.Schema({
  seatNos: [{
    row: String
    col: String
  }]
});

export default mongoose.model('paymentdetails', PaymentEndpointSchema);
