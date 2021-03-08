const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

app.use(cors());

// Authentication of user
const authentication = require('../authentication/auth');

const accountDetails = require('../controllers/account/accountCtrl');
const contactCtrl = require('../controllers/account/contactCtrl');
const paymentCtrl = require('../controllers/account/paymentCtrl');
const taxCtrl = require('../controllers/account/taxCtrl');
const billingCtrl = require('../controllers/account/billingCtrl');

// MiddleWare
const accountMiddleWare = require('../middleware/account/accountsMiddleware');
const contactMiddleWare = require('../middleware/account/contactsMiddleware');
const paymentMiddleWare = require('../middleware/account/paymentMiddleware');
const taxInfoMiddleWare = require('../middleware/account/taxInformationMiddleware');
const billingInformationMiddleware = require('../middleware/account/billInformationMiddleware');

//type stack routing-controllers --> npm

// Accounts API Create
app.post('/account/create', [authentication.authUser, accountMiddleWare.accountCreateMiddleWare], (req, res, next) => {
  accountDetails.accountCreate(req, res);
});

// Accounts API Update
app.post('/account/update/:id', [authentication.authUser, accountMiddleWare.accountUpdateMiddleWare], (req, res, next) => { //atique
  accountDetails.accountUpdate(req, res);
});

// Accounts API List
app.get('/account/list', authentication.authUser, (req, res, next) => {
  accountDetails.accountList(req, res);
});

// Accounts API ListById
app.get('/account/list/:id', authentication.authUser, (req, res, next) => {
  accountDetails.accountListById(req, res);
});

// Accounts API Delete
app.get('/account/delete/:id', authentication.authUser, (req, res, next) => {
  accountDetails.accountDeleteById(req, res);
});

// Contact API
app.post('/contact/create', [authentication.authUser, contactMiddleWare.contactFilterData], (req, res, next) => {
  contactCtrl.contactDetails(req, res);
});

app.get('/contact/list/:id', authentication.authUser, (req, res, next) => {
  contactCtrl.getAllContacts(req, res);
});

// Account Billing Information API
app.post('/account/billinfo/create', [authentication.authUser, billingInformationMiddleware.billingInformationMiddleWare], (req, res, next) => {
  billingCtrl.billingInformation(req, res);
});

app.get('/account/billinfo/create/:id', authentication.authUser, (req, res, next) => {
  billingCtrl.getBillingInformation(req, res);
});


// Account Tax Information API
app.post('/account/taxinfo/create', [authentication.authUser, taxInfoMiddleWare.taxInformationMiddleWare], (req, res, next) => {
  taxCtrl.taxInformation(req, res);
});

app.get('/account/taxinfo/create/:id', authentication.authUser, (req, res, next) => {
  taxCtrl.getTaxInformation(req, res);
});

// Payment API
app.post('/verify/payment', [authentication.authUser , paymentMiddleWare.verifyPaymentInformation] , (req, res, next) => {
  paymentCtrl.verifyPayment(req, res);
});

app.get('/account/payment/information/:id', authentication.authUser, (req, res, next) => {
  paymentCtrl.getPaymentInformation(req, res);
});

module.exports = app;
