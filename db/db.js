const mongoose = require('mongoose');
require('dotenv').config();

const connect = async (req,res) => {
  return await mongoose.connect(process.env.MONGODB),
  console.log("MongoDB is up and running!")
};

const saveEntry = async (newEntry) => {
  return await newEntry.save(),
  console.log('Saving New Entry');
}

const disconnect = () => {
  return mongoose.connection.close(),
  console.log('Real Disconnect');
}
module.exports = {connect, saveEntry, disconnect}