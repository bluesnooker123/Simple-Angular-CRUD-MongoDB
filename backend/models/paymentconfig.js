const mongoose = require('mongoose');

var paymentconfig = new mongoose.Schema({
  dropdown: {
    type: String
  },
  payment_getway: {
    type: Array
  },
  payment_type: {
    type: Array
  }
});

var Paymentconfig = mongoose.model('Paymentconfig', paymentconfig);
module.exports = Paymentconfig;
