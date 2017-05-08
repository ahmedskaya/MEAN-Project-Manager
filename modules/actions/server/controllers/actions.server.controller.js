'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Action = mongoose.model('Action'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Action
 */
exports.create = function(req, res) {
  var action = new Action(req.body);
  action.user = req.user;

  action.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(action);
    }
  });
};

/**
 * Show the current Action
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var action = req.action ? req.action.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  action.isCurrentUserOwner = req.user && action.user && action.user._id.toString() === req.user._id.toString();

  res.jsonp(action);
};

/**
 * Update a Action
 */
exports.update = function(req, res) {
  var action = req.action;

  action = _.extend(action, req.body);

  action.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(action);
    }
  });
};

/**
 * Delete an Action
 */
exports.delete = function(req, res) {
  var action = req.action;

  action.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(action);
    }
  });
};

/**
 * List of Actions
 */
exports.list = function(req, res) {
  Action.find().sort('-created').populate('user', 'displayName').exec(function(err, actions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(actions);
    }
  });
};

/**
 * Action middleware
 */
exports.actionByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Action is invalid'
    });
  }

  Action.findById(id).populate('user', 'displayName').exec(function (err, action) {
    if (err) {
      return next(err);
    } else if (!action) {
      return res.status(404).send({
        message: 'No Action with that identifier has been found'
      });
    }
    req.action = action;
    next();
  });
};
