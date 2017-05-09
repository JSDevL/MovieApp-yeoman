/**
 * PaymentEndpoint model events
 */

'use strict';

import {EventEmitter} from 'events';
import PaymentEndpoint from './payment-endpoint.model';
var PaymentEndpointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PaymentEndpointEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  PaymentEndpoint.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PaymentEndpointEvents.emit(event + ':' + doc._id, doc);
    PaymentEndpointEvents.emit(event, doc);
  }
}

export default PaymentEndpointEvents;
