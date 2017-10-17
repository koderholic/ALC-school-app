// jshint esnext: true

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let citySchema =  new Schema({

  name: {
    type: String,
    required: true
  },

  state_id: {
    type: Schema.objectId,
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

module.exports = mongoose.model('City', citySchema);
