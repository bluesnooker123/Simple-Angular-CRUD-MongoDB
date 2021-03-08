const mongoose = require('mongoose');

var billinginfoconfig = new mongoose.Schema({
  dropdown: {
    type: String
  },
  billing_currency: {
    type: Array
  },
  billingday: {
    type: Array
  },
  billingbatch: {
    type: Array
  },
  inv_language: {
    type: Array
  },
  inv_template: {
    type: Array
  },
  inv_deliverytype: {
    type: Array
  },
  paymentafter: {
    type: Array
  }
});

var Billinginformationconfig = mongoose.model('Billinginformationconfig', billinginfoconfig);
module.exports = Billinginformationconfig;
