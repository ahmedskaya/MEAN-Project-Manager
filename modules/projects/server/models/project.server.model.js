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
    default: 'pending'
  },
  experts: {
    first: {
      fullName: {
        type: String,
        max:20,
        default:'',
        trim: true
      },
      description: {
        type: String,
        max:1000,
        default:'',
        trim: true
      },
      status: {
        type: String,
        default: 'pending',
        trim: true
      }
    },
    second: {
      fullName: {
        type: String,
        max:20,
        default:'',
        trim: true
      },
      description: {
        type: String,
        max:1000,
        default:'',
        trim: true
      },
      status: {
        type: String,
        default: 'pending',
        trim: true
      }
    },
    third: {
      fullName: {
        type: String,
        max:20,
        default:'',
        trim: true
      },
      description: {
        type: String,
        max:1000,
        default:'',
        trim: true
      },
      status: {
        type: String,
        default: 'pending',
        trim: true
      }
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
