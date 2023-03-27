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
    type: Number,
    max: 100
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

  customerSchema.pre('find', () => {
    console.log(this instanceof mongoose.Query);
    return this.start = Date.now()
  });

  customerSchema.post('find', (result) => {
    console.log('find() returned ' + JSON.stringify(result))
    console.log('find() took ' + (Date.now() - this.start) + 'milliseconds')
  })

  module.exports = mongoose.model('Customer', customerSchema)