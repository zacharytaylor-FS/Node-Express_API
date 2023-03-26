const express = require('express');
const mongoose = require('mongoose');
const { saveEntry } = require('../../db/db');
const product = require('../model/product');
const Product = require('../model/product')
const router = express.Router();


//* GET ALL - show all products
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Users - GET ALL',
    method: req.method,
    Timestamp: new Date().toLocaleTimeString()
  })
});

router.get('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Users - GET by Id',
    method: req.method,
    Timestamp: new Date().toLocaleTimeString()
  })
});
//* Create User
router.post('/add', (req, res, next) => {
  const name = req.body.name;
  const manfacture = req.body.manufacture;
  const type = req.body.type;
  const sold = req.body.sold;

  const newProduct = new Product({
    name: name,
    type: type,
    sold: sold,
    manufacture: manfacture
  });
  
  saveEntry(newProduct)
    .then((dbProduct) => {
      return res.status(201).json({product: dbProduct})
    }).catch(err => {
      res.status(501).json({
        error: {
          message: err.message,
          stauts: err.status
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