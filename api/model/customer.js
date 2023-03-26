const mongoose = require('mongoose');

//? ADD Order to customer Schema
// const orderSchema = new Schema({
//   _orderId: mongoose.Types.ObjectId,

// })

const customerSchema = new mongoose.Schema({
  _customerId: mongoose.Schema.Types.ObjectId,
  name:{
    type: String,
    required: true,
    lowercase: true
  },
  orderCount:{
    type: Number
  },
  email: {
    type: String,
    lowercase: true
  },
  age:{
    type: Number,
    min: 1,
    max: 120
  },
  living: {
    type: Boolean,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now
  }
  });

  module.exports = mongoose.model('Customer', customerSchema)