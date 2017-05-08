'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Action Schema
 */
var ActionSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Action name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Action', ActionSchema);
