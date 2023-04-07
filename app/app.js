const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const customerRouter = require('../api/routes/customers')
const productRouter = require('../api/routes/products')
const {connect, disconnect, saveUser} = require('../db/db')

require('dotenv').config();

// * middleware for logging
app.use(morgan('dev'));

//* middleware to accept json as input
app.use(express.json())

//* middleware for body Parsing
app.use(express.urlencoded({
  extended: true
}));

//* middleware for CORS
app.use(cors());

app.get('/', (req,res,next) => {
  res.status(200).json({
    message: 'Root - Service is up',
    method: req.method,
    date: new Date().toLocaleString(),
  })
});

//* routes - ROUTER(s)
app.use('/customers', customerRouter)
app.use('/products', productRouter)

//* middleware to handle ERRORS and bad url
app.use((req, res, next) => {
  const error = new Error('NOT FOUND!!');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      status: error.status,
      method: req.method,
    }
  })
});

connect();
module.exports = app