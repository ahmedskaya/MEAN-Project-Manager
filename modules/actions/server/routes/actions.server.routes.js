'use strict';

/**
 * Module dependencies
 */
var actionsPolicy = require('../policies/actions.server.policy'),
  actions = require('../controllers/actions.server.controller');

module.exports = function(app) {
  // Actions Routes
  app.route('/api/actions').all(actionsPolicy.isAllowed)
    .get(actions.list)
    .post(actions.create);

  app.route('/api/actions/:actionId').all(actionsPolicy.isAllowed)
    .get(actions.read)
    .put(actions.update)
    .delete(actions.delete);

  // Finish by binding the Action middleware
  app.param('actionId', actions.actionByID);
};
