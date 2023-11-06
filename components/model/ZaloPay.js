const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  apptransid: { 
    type: String,
    required: true,
    unique: true
  },

  zptransid: {
    type: String
  },

  description: {
    type: String
  },

  amount: {
    type: Number
  },

  timestamp: {
    type: Number
  },

  channel: {
    type: Number
  }

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;