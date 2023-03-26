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
  const age = req.body.age;
  const email = req.body.email;
  const living = req.body.living;

  const newCustomer = new Customer({
    name: name,
    email: email,
    living: living,
    age: age
  });
  
  saveEntry(newCustomer)
    .then((dbCustomer) => {
      return res.status(200).json({customer: dbCustomer})
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
  name: req.body.name,
  email: req.body.email,
  living: req.body.living,
  age: req.body.age,
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
      email: result.email,
      living: result.living,
      age: result.age
    },
    metadata: {
      host: req.hostname,
      method: req.method
    }
  })
})
.catch(err => {
  res.status(500).json({
    error: {
      message: err.message,
    }
  })
});
})
router.delete('/:customerId', (req, res, next) => {
 const customerId = req.params.customerId
  res.status(200).json({
    id:customerId,
    message: 'Users - DELETE by Id',
    method: req.method,
    Timestamp: new Date().toLocaleTimeString()
  })
})

module.exports = router