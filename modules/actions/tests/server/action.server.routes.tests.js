'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Action = mongoose.model('Action'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  action;

/**
 * Action routes tests
 */
describe('Action CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Action
    user.save(function () {
      action = {
        name: 'Action name'
      };

      done();
    });
  });

  it('should be able to save a Action if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Action
        agent.post('/api/actions')
          .send(action)
          .expect(200)
          .end(function (actionSaveErr, actionSaveRes) {
            // Handle Action save error
            if (actionSaveErr) {
              return done(actionSaveErr);
            }

            // Get a list of Actions
            agent.get('/api/actions')
              .end(function (actionsGetErr, actionsGetRes) {
                // Handle Actions save error
                if (actionsGetErr) {
                  return done(actionsGetErr);
                }

                // Get Actions list
                var actions = actionsGetRes.body;

                // Set assertions
                (actions[0].user._id).should.equal(userId);
                (actions[0].name).should.match('Action name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Action if not logged in', function (done) {
    agent.post('/api/actions')
      .send(action)
      .expect(403)
      .end(function (actionSaveErr, actionSaveRes) {
        // Call the assertion callback
        done(actionSaveErr);
      });
  });

  it('should not be able to save an Action if no name is provided', function (done) {
    // Invalidate name field
    action.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Action
        agent.post('/api/actions')
          .send(action)
          .expect(400)
          .end(function (actionSaveErr, actionSaveRes) {
            // Set message assertion
            (actionSaveRes.body.message).should.match('Please fill Action name');

            // Handle Action save error
            done(actionSaveErr);
          });
      });
  });

  it('should be able to update an Action if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Action
        agent.post('/api/actions')
          .send(action)
          .expect(200)
          .end(function (actionSaveErr, actionSaveRes) {
            // Handle Action save error
            if (actionSaveErr) {
              return done(actionSaveErr);
            }

            // Update Action name
            action.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Action
            agent.put('/api/actions/' + actionSaveRes.body._id)
              .send(action)
              .expect(200)
              .end(function (actionUpdateErr, actionUpdateRes) {
                // Handle Action update error
                if (actionUpdateErr) {
                  return done(actionUpdateErr);
                }

                // Set assertions
                (actionUpdateRes.body._id).should.equal(actionSaveRes.body._id);
                (actionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Actions if not signed in', function (done) {
    // Create new Action model instance
    var actionObj = new Action(action);

    // Save the action
    actionObj.save(function () {
      // Request Actions
      request(app).get('/api/actions')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Action if not signed in', function (done) {
    // Create new Action model instance
    var actionObj = new Action(action);

    // Save the Action
    actionObj.save(function () {
      request(app).get('/api/actions/' + actionObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', action.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Action with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/actions/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Action is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Action which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Action
    request(app).get('/api/actions/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Action with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Action if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Action
        agent.post('/api/actions')
          .send(action)
          .expect(200)
          .end(function (actionSaveErr, actionSaveRes) {
            // Handle Action save error
            if (actionSaveErr) {
              return done(actionSaveErr);
            }

            // Delete an existing Action
            agent.delete('/api/actions/' + actionSaveRes.body._id)
              .send(action)
              .expect(200)
              .end(function (actionDeleteErr, actionDeleteRes) {
                // Handle action error error
                if (actionDeleteErr) {
                  return done(actionDeleteErr);
                }

                // Set assertions
                (actionDeleteRes.body._id).should.equal(actionSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Action if not signed in', function (done) {
    // Set Action user
    action.user = user;

    // Create new Action model instance
    var actionObj = new Action(action);

    // Save the Action
    actionObj.save(function () {
      // Try deleting Action
      request(app).delete('/api/actions/' + actionObj._id)
        .expect(403)
        .end(function (actionDeleteErr, actionDeleteRes) {
          // Set message assertion
          (actionDeleteRes.body.message).should.match('User is not authorized');

          // Handle Action error error
          done(actionDeleteErr);
        });

    });
  });

  it('should be able to get a single Action that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Action
          agent.post('/api/actions')
            .send(action)
            .expect(200)
            .end(function (actionSaveErr, actionSaveRes) {
              // Handle Action save error
              if (actionSaveErr) {
                return done(actionSaveErr);
              }

              // Set assertions on new Action
              (actionSaveRes.body.name).should.equal(action.name);
              should.exist(actionSaveRes.body.user);
              should.equal(actionSaveRes.body.user._id, orphanId);

              // force the Action to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Action
                    agent.get('/api/actions/' + actionSaveRes.body._id)
                      .expect(200)
                      .end(function (actionInfoErr, actionInfoRes) {
                        // Handle Action error
                        if (actionInfoErr) {
                          return done(actionInfoErr);
                        }

                        // Set assertions
                        (actionInfoRes.body._id).should.equal(actionSaveRes.body._id);
                        (actionInfoRes.body.name).should.equal(action.name);
                        should.equal(actionInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Action.remove().exec(done);
    });
  });
});
