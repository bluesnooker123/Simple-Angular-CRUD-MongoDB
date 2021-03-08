const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

app.use(cors());

// Authentication of user
const authentication = require('../authentication/auth');

const configCtrl = require('../controllers/configCtrl');

// Account Config API
app.get('/account/config/details', authentication.authUser, (req, res, next) => {
  configCtrl.accountConfigDetails(req, res);
});

// Contact Config API
app.get('/contact/config/details', authentication.authUser, (req, res, next) => {
  configCtrl.contactConfigDetails(req, res);
});

// Account Billing Config API
app.get('/billing/config/details', authentication.authUser, (req, res, next) => {
  configCtrl.billingInformationConfigDetails(req, res);
});

// Payment Config API
app.get('/payment/config/details', authentication.authUser, (req, res, next) => {
  configCtrl.paymentConfigDetails(req, res);
});

module.exports = app;
