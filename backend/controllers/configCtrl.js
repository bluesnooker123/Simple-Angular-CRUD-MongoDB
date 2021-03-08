
const mongoose = require('mongoose');
const chalk = require('chalk');
// const Product = require('../models/product');

// Model For Accounts
require('../models/accountconfig');
require('../models/contactconfig');
require('../models/paymentconfig');
require('../models/billinginformationconfig');

// Model For Products
require('../models/productconfig');

// For Accounts
const Accountconfig = mongoose.model('Accountconfig');
const Contactconfig = mongoose.model('Contactconfig');
const Paymentconfig = mongoose.model('Paymentconfig');
const Billinginformationconfig = mongoose.model('Billinginformationconfig');

// For Products
const Tenantconfig = mongoose.model('Tenantconfig');

// For Accounts
exports.accountConfigDetails = (req, res, next) => {
  Accountconfig.findOne({dropdown: 'accounts'}, async( err, acntcong) => {
    if(acntcong !== null) {
      res.send({
        status:200,
        data: acntcong,
        message: 'successfully fetched record !!'
      });
    } else {
      res.send({
        status:400,
        err: err,
        message: 'Error, Something wrong!!'
      });
    }
  });
};

exports.contactConfigDetails = (req, res, next) => {
  Contactconfig.findOne({dropdown: 'contacts'}, async( err, contactconf) => {
    if(contactconf !== null) {
      res.send({
        status:200,
        data: contactconf,
        message: 'successfully fetched record !!'
      });
    } else {
      res.send({
        status:400,
        err: err,
        message: 'Error, Something wrong!!'
      });
    }
  });
};

exports.billingInformationConfigDetails = (req, res, next) => {
  Billinginformationconfig.findOne({dropdown: 'billinginformation'}, async( err, billinginfo) => {
    if(billinginfo !== null) {
      res.send({
        status:200,
        data: billinginfo,
        message: 'successfully fetched record !!'
      });
    } else {
      res.send({
        status:400,
        err: err,
        message: 'Error, Something wrong!!'
      });
    }
  });
};


exports.paymentConfigDetails = (req, res, next) => {
  Paymentconfig.findOne({dropdown: 'payment'}, async( err, paymentconf) => {
    if(paymentconf !== null) {
      res.send({
        status:200,
        data: paymentconf,
        message: 'successfully fetched record !!'
      });
    } else {
      res.send({
        status:400,
        err: err,
        message: 'Error, Something wrong!!'
      });
    }
  });
};

// For Products
exports.productConfigDetails = (req, res, next) => {
  Tenantconfig.findOne({dropdown: 'tenantfile'}, async( err, tenantcong) => {
    if(tenantcong !== null) {
      res.send({
        status:200,
        data: tenantcong,
        message: 'successfully fetched record !!'
      });
    } else {
      res.send({
        status:400,
        err: err,
        message: 'Error, Something wrong!!'
      });
    }
  });
};


// Write the update code here ------->
