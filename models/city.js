// jshint esnext: true
const State = require('../models/state');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let citySchema =  new Schema({

  name: {
    type: String,
    required: true
  },

  state_id: {
    type: Schema.ObjectId,
    ref:'State',
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

},{
  toObject : {virtuals : true},
  toJSON : {virtuals :true}
});

citySchema.virtual('state')
.get(function (id) {
  State.findById(id).then((state) => {
    return state.name
  }).catch((err) => {
    return '';
  });
});

module.exports = mongoose.model('City', citySchema);
