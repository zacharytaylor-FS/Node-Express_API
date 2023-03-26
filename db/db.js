const mongoose = require('mongoose');
require('dotenv').config();
const connect = async (req,res) => {
  console.log('MongoDB is up and running!')
  return await mongoose.connect(process.env.MONGODB)
};

const saveEntry = async (newEntry) => {
  console.log('Saving New Entry');
  return await newEntry.save();
}

const disconnect = () => {
  console.log('Real Disconnect');
  return mongoose.connection.close()
}
module.exports = {connect, saveEntry, disconnect}