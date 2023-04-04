const express = require('express');
const mongoose = require('mongoose');
const { saveEntry } = require('../../db/db');
const Customer = require('../model/customer');
const errorTemplate = require('../../templates/errorTemplates');
const messages = require('../../messages/messages');
const successTemplate = require('../../templates/successTemplate');
const router = express.Router();



//* GET ALL - show all users
router.get('/', async (req, res, next) => {

   await Customer.find({})
  .then(users => {
    console.log(users);
    res.status(200).json({
      users,
      message: 'Users - GET ALL',
      method: req.method,
      Timestamp: new Date().toLocaleTimeString()
    })
  }).catch(err => {
    res.status(500).json({
      error: {
        message: err.message,
        status: err.status,
      }
    })
  });
});

router.get('/:customerId', (req, res, next) => {
  const customerId = req.params.customerId

  Customer.findOne({_id:customerId})
   .then(result => {
    res.status(200).json({
      message: 'Users - GET by Id',
      customer: result,
      metadata: {
        host: req.hostname,
        method: req.method,
        Timestamp: new Date().toLocaleTimeString()
      }
    })
    
  })
  .catch(err => {
    console.log(err.message);
    res.status(500).json({
      error: {
        message: err.message
      }
    })
  })
});

//* Create User
router.post('/add', (req, res, next) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const date_of_birth = req.body.date_of_birth;
  const address = req.body.address
  const city = req.body.city
  const zipcode = req.body.zipcode
  const ordered_products = req.body.ordered_products
  const email = req.body.email;
  const age = req.body.age;
  const living = req.body.living;


  const newCustomer = new Customer({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: first_name,
    last_name: last_name,
    date_of_birth:date_of_birth,
    address: address,
    city: city,
    zipcode: zipcode,
    ordered_products: ordered_products,
    email: email,
    age: age,
    living: living,
  });
  
  saveEntry(newCustomer)
    .then(result => {
      return successTemplate(res,result, messages.customer_save, 201)
      // console.log(result)
      // res.status(200).json({
      //   message: messages.customer_on_save,
      //   customer: {
      //     name: result.name,
      //     orderCount: result.orderCount,
      //     email: result.email,
      //     id: result._id,
      //     age: result.age,
      //     living: result.living,
      //     metadata: {
      //       method: req.method,
      //       host: req.hostname
      //     }
      //   }
      // })
    }).catch(err => {
      return errorTemplate(res, err, messages.customer_unsaved, 500)
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
      success: {result},
      metadata: {
        host: req.hostname,
        method: req.method,
        Timestamp: new Date().toLocaleTimeString(),
      }
    })
  }).catch(err => {
    res.status(500).json({
      message: err.message,
      status: err.status
    })
  });
})

module.exports = router