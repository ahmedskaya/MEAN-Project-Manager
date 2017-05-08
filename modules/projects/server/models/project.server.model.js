'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
  title: {
    type: String,
    default: '',
    max:50,
    required: 'Please fill Project title',
    trim: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'new'
  },
  experts: {
    fullName: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      default: 'pending',
      trim: true
    }
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

mongoose.model('Project', ProjectSchema);
