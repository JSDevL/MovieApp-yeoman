/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/admin-view-endpoints              ->  index
 * POST    /api/admin-view-endpoints              ->  create
 * GET     /api/admin-view-endpoints/:id          ->  show
 * PUT     /api/admin-view-endpoints/:id          ->  update
 * DELETE  /api/admin-view-endpoints/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import AdminViewEndpoint from '../moviesModel';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of AdminViewEndpoints
export function index(req, res) {
  return AdminViewEndpoint.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single AdminViewEndpoint from the DB
export function show(req, res) {
  return AdminViewEndpoint.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new AdminViewEndpoint in the DB
export function create(req, res) {
  return AdminViewEndpoint.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing AdminViewEndpoint in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return AdminViewEndpoint.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a AdminViewEndpoint from the DB
export function destroy(req, res) {
  return AdminViewEndpoint.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
