/**
 * MovieEndpoint model events
 */

'use strict';

import {EventEmitter} from 'events';
import MovieEndpoint from './movie-endpoint.model';
var MovieEndpointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MovieEndpointEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  MovieEndpoint.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MovieEndpointEvents.emit(event + ':' + doc._id, doc);
    MovieEndpointEvents.emit(event, doc);
  }
}

export default MovieEndpointEvents;
