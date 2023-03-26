const express = require('express');
const mongoose = require('mongoose');
const { saveEntry } = require('../../db/db');
const Customer = require('../model/customer')
const router = express.Router();


//* GET ALL - show all users
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Users - GET ALL',
    method: req.method,
    Timestamp: new Date().toLocaleTimeString()
  })
});

router.get('/:customerId', (req, res, next) => {
  const customerId = req.params.customerId
  res.status(200).json({
    id:customerId,
    message: 'Users - GET by Id',
    method: req.method,
    Timestamp: new Date().toLocaleTimeString()
  })
});
//* Create User
router.post('/add', (req, res, next) => {
  const name = req.body.name;
  const orderCount = req.body.orderCount
  const age = req.body.age;
  const email = req.body.email;
  const living = req.body.living;

  const newCustomer = new Customer({
    // _id: mongoose.Schema.Types.ObjectId,
    name: name,
    orderCount: orderCount,
    email: email,
    living: living,
    age: age
  });
  
  saveEntry(newCustomer)
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: "Customer Saved",
        customer: {
          name: result.name,
          orderCount: result.orderCount,
          email: result.email,
          id: result._id,
          age: result.age,
          living: result.living,
          metadata: {
            method: req.method,
            host: req.hostname
          }
        }
      })
    }).catch(err => {
      res.status(501).json({
        error: {
          message: err.message,
          stauts: err.status
        }
      })
    })

});

router.patch('/update/:customerId', (req, res, next) => {
 const customerId = req.params.customerId

 const updatedCustomer = {
  _id: customerId,
  name: req.body.name,
  orderCount: req.body.orderCount,
  email: req.body.email,
  age: req.body.age,
  living: req.body.living,
 }

 Customer.updateOne({
  _id:customerId
},{
  $set: updatedCustomer
}).then(result => {
  res.status(200).json({
    message: "Updated Customer",
    customer: {
      name: result.name,
      orderCount: result.orderCount,
      email: result.email,
      id: result._id,
      age: result.age,
      living: result.living,
    },
    metadata: {
      host: req.hostname,
      method: req.method,
      Timestamp: new Date().toLocaleTimeString(),
    }
  })
})
.catch(err => {
  res.status(500).json({
    error: {
      message: err.message,
      status: err.status
    }
  })
});
})
router.delete('/delete/:customerId', (req, res, next) => {
  const customerId = req.params.customerId

Customer.deleteOne({_id:customerId})
  .then(result => {
    res.status(200).json({
      message: "Delete Customer",
      result: {result},
      metadata: {
        host: req.hostname,
        method: req.method,
        Timestamp: new Date().toLocaleTimeString(),
      }
    })
  }).catch();
  res.status(200).json({
    id:customerId,
    message: 'Users - DELETE by Id',
    method: req.method,
    Timestamp: new Date().toLocaleTimeString()
  })
})

module.exports = router