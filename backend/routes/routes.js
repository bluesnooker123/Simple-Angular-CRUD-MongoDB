const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

app.use(cors());

// Authentication of user
const authentication = require('../authentication/auth');

// Controller
const endUser = require('../controllers/login-registration/endUserCtrl');

const configAccountConfig = require('../controllers/AccountConfigCtrl');
const configBillingConfig = require('../controllers/BillingConfigCtrl');
const configPaymentConfig = require('../controllers/PaymentConfigCtrl');

// Sample API testing
app.get('/', (req, res) => {
  res.send({
     status:200,
     message:'App is working fine!'
  });
});

// Register users
app.post('/users/register', (req, res, next) => {
  endUser.registration(req, res);
});

// Login users
app.post('/users/login',  (req, res, next) => {
  endUser.login(req, res);
});

// Add users
app.post('/users/add', authentication.authUser, (req, res, next) => {
  endUser.add(req, res);
});

// Get All User
app.get('/users', authentication.authUser, (req, res, next) => {
  endUser.getUsers(req, res);
});

// Get specific Users
app.get('/users/:id', authentication.authUser, (req, res, next) => {
  endUser.getEachUser(req, res);
});

// User Update
app.post('/users/update/:id', authentication.authUser, (req, res, next) => {
  endUser.userUpdate(req, res);
});

// User Delete
app.get('/users/delete/:id', authentication.authUser, (req, res, next) => {
  endUser.userDelete(req, res);
});


// Create Account Config Data
app.post('/configCreateAccountConfig',  (req, res, next) => {
  configAccountConfig.configCreateAccountConfig(req, res);
});

// Read Account Config Data
app.post('/configReadAccountConfig',  (req, res, next) => {
  configAccountConfig.configReadAccountConfig(req, res);
});

// Update Account Config Data
app.post('/configUpdateAccountConfig',  (req, res, next) => {
  configAccountConfig.configUpdateAccountConfig(req, res);
});

// Delete Account Config Data
app.post('/configDeleteAccountConfig',  (req, res, next) => {
  configAccountConfig.configDeleteAccountConfig(req, res);
});



// Create Billing Config Data
app.post('/configCreateBillingConfig',  (req, res, next) => {
  configBillingConfig.configCreateBillingConfig(req, res);
});

// Read Billing Config Data
app.post('/configReadBillingConfig',  (req, res, next) => {
  configBillingConfig.configReadBillingConfig(req, res);
});

// Update Billing Config Data
app.post('/configUpdateBillingConfig',  (req, res, next) => {
  configBillingConfig.configUpdateBillingConfig(req, res);
});

// Delete Billing Config Data
app.post('/configDeleteBillingConfig',  (req, res, next) => {
  configBillingConfig.configDeleteBillingConfig(req, res);
});


// Create Payment Config Data
app.post('/configCreatePaymentConfig',  (req, res, next) => {
  configPaymentConfig.configCreatePaymentConfig(req, res);
});

// Read Payment Config Data
app.post('/configReadPaymentConfig',  (req, res, next) => {
  configPaymentConfig.configReadPaymentConfig(req, res);
});

// Update Payment Config Data
app.post('/configUpdatePaymentConfig',  (req, res, next) => {
  configPaymentConfig.configUpdatePaymentConfig(req, res);
});

// Delete Payment Config Data
app.post('/configDeletePaymentConfig',  (req, res, next) => {
  configPaymentConfig.configDeletePaymentConfig(req, res);
});


module.exports = app;
