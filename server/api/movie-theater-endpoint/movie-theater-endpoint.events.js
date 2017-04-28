/**
 * MovieTheaterEndpoint model events
 */

'use strict';

import {EventEmitter} from 'events';
import MovieTheaterEndpoint from './movie-theater-endpoint.model';
var MovieTheaterEndpointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MovieTheaterEndpointEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  MovieTheaterEndpoint.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MovieTheaterEndpointEvents.emit(event + ':' + doc._id, doc);
    MovieTheaterEndpointEvents.emit(event, doc);
  }
}

export default MovieTheaterEndpointEvents;
