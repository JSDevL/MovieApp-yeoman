/**
 * TheaterEndpoint model events
 */

'use strict';

import {EventEmitter} from 'events';
import TheaterEndpoint from './theater-endpoint.model';
var TheaterEndpointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TheaterEndpointEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TheaterEndpoint.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TheaterEndpointEvents.emit(event + ':' + doc._id, doc);
    TheaterEndpointEvents.emit(event, doc);
  }
}

export default TheaterEndpointEvents;
