const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    default: 0.00
  },
  sold: {
    type: Date,
    date: Date.now
  },
  type: {
    type: String,
    required: true
  },
  manufacture: {
    type: String,
    required: true,
    lowercase: true
  }
})

module.exports = mongoose.model('Product', productSchema)