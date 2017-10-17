// jshint esnext: true

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let courseSchema =  new Schema({

  title: {
    type: String,
    required: true
  },

  module: {
    type: Number,
    required : true
  },

  created_at: {
    type: Date,
    default: Date.now
  },

  updated_at: {
    type: Date,
    default: Date.now
  }

});

courseSchema
.virtual('course')
.get(function () {
    return `${this.title} (${this.module})`;
});

module.exports = mongoose.model('Course', courseSchema);
