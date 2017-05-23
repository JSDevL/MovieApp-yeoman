/**
 * RatingEndpoint model events
 */

'use strict';

import {EventEmitter} from 'events';
import RatingEndpoint from './rating-endpoint.model';
var RatingEndpointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RatingEndpointEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  RatingEndpoint.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    RatingEndpointEvents.emit(event + ':' + doc._id, doc);
    RatingEndpointEvents.emit(event, doc);
  }
}

export default RatingEndpointEvents;
