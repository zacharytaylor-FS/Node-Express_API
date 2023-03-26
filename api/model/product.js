const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _productId: mongoose.Types.ObjectId,
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  price: {
    type: Number,
    required: true
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