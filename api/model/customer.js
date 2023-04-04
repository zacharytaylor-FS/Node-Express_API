const mongoose = require('mongoose');

//? ADD Order to customer Schema
// const orderSchema = new Schema({
//   _orderId: mongoose.Types.ObjectId,

// })

const customerSchema = new mongoose.Schema({
  _customerId: mongoose.Schema.Types.ObjectId,
  first_name:{
    type: String,
    required: true,
    lowercase: true
  },
  last_name:{
    type: String,
    required: true,
    lowercase: true
  },
  date_of_birth: {
    type: Number,
    required: true
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  zipcode: {
    type: Number,
    default: 11111
  },
  // phone: {
  //   type: String,
  //   default: 222-333-3333,
  //   validate: {
  //     validator: function(num) {
  //       return /\d{3}-\d{3}-\d{4}/.test(v)
  //     }
  //   }
  // },
  ordered_products:[{
    type: Number,
    max: 100
  }],
  email: {
    type: String,
    lowercase: true,
    default: 'example@example.com'
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
  createdAt: {
    type: Date,
    default: Date.now
  },
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