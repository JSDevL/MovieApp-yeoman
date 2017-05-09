/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/payment-endpoints', require('./api/payment-endpoint'));
  app.use('/api/movie-theater-endpoints', require('./api/movie-theater-endpoint'));
  app.use('/api/cities', require('./api/city'));
  app.use('/api/theater-endpoints', require('./api/theater-endpoint'));
  app.use('/api/main-endpoints', require('./api/main-endpoint'));
  app.use('/api/admin-view-endpoints', require('./api/admin-view-endpoint'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
