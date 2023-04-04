const express = require('express');
const mongoose = require('mongoose');
const { saveEntry } = require('../../db/db');
const Product = require('../model/product');
const successTemplate = require('../../templates/successTemplate');
const messages = require('../../messages/messages');
const errorTemplate = require('../../templates/errorTemplates');
const router = express.Router();


//* GET ALL - show all products
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Products - GET ALL',
    method: req.method,
    Timestamp: new Date().toLocaleTimeString()
  })
});

//* GET Product by Id
router.get('/:productId', (req, res, next) => {
  const productId = req.params.productId

  Product.findById(productId)
  .then(result =>  {
    return successTemplate(res, result, messages.product_saved, 201)
    // res.status(200).json({                
    //   message: `Products - GET by ID at:' ,${new Date.now}`
    // })
  })
  .catch(err => {
    return errorTemplate(res, err, messages.product_on_unsaved, 500)
  })                                      
  res.status(200).json({
  })
});
//* Create Product
router.post('/add', (req, res, next) => {
  const name = req.body.name;
  const price = req.body.name;
  const type = req.body.type;
  const sold = req.body.sold;
  const manufacture = req.body.manufacture;

  const newProduct = new Product({
    name: name,
    price: price,
    type: type,
    sold: sold,
    manufacture: manufacture
  });
  
  saveEntry(newProduct)
    .then((dbProduct) => {
      return res.status(201).json({product: dbProduct})
    }).catch(err => {
      res.status(501).json({
        error: {
          message: err.message,
          status: err.status
        }
      })
    })

});

router.put('/update/:id', (req, res, next) => {
 const id = req.params.id
  res.status(200).json({
    id:id,
    message: 'Users - GET by Id',
    method: req.method,
    Timestamp: new Date().toLocaleTimeString()
  })
})
router.delete('/:id', (req, res, next) => {
 const id = req.params.id
  res.status(200).json({
    id:id,
    message: 'Users - DELETE by Id',
    method: req.method,
    Timestamp: new Date().toLocaleTimeString()
  })
})

module.exports = router