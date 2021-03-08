const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

app.use(cors());

// Authentication of user
const authentication = require('../authentication/auth');

// Controller
const configCtrl = require('../controllers/configCtrl');
const productDetails = require('../controllers/product/productCtrl');
const productPriceGroup = require('../controllers/product/priceGroupCtrl');
const productPriceChargesGroup = require('../controllers/product/priceGroupChargeCtrl');
const couponDetails = require('../controllers/product/couponCtrl');
const voucherDetails = require('../controllers/product/voucherCtrl');

// MiddleWare
const productMiddleWare = require('../middleware/product/productsMiddleware');
const productPriceGroupMiddleWare = require('../middleware/product/productsPriceGroupMiddleware');
const productsCouponMiddleware = require('../middleware/product/productsCouponMiddleware');
const productsVoucherMiddleware = require('../middleware/product/productsVoucherMiddleware');

// Products Config API
app.get('/product/config/details', authentication.authUser, (req, res, next) => {
  configCtrl.productConfigDetails(req, res);
});

// Products API Create
app.post('/product/create', [authentication.authUser, productMiddleWare.productsMiddleWareValidation], (req, res, next) => {
  productDetails.ProductCreate(req, res);
});

// Products API Create
app.post('/product/image/upload', [authentication.authUser], (req, res, next) => {
  productDetails.imageCreate(req, res);
});

// Products API Update
app.post('/product/update/:id', [authentication.authUser, productMiddleWare.productsUpdateMiddleWare], (req, res, next) => {
  productDetails.productUpdate(req, res);
});

// Products API List
app.get('/product/list', authentication.authUser, (req, res, next) => {
  productDetails.productList(req, res);
});

// Products API ListById
app.get('/product/list/:id', authentication.authUser, (req, res, next) => {
  productDetails.productListById(req, res);
});

// Products API Delete
app.get('/product/delete/:id', authentication.authUser, (req, res, next) => {
  productDetails.productDeleteById(req, res);
});

// Products Create New PriceGroup API
app.post('/product/pricegroup/information', [authentication.authUser, productPriceGroupMiddleWare.productsPriceGroupMiddleWareValidation], (req, res, next) => {
  productPriceGroup.priceGroup(req, res);
});

app.get('/product/pricegroup/information/:id', authentication.authUser, (req, res, next) => {
  productPriceGroup.getPriceGroupInformation(req, res);
});

// Products Create New PriceGroup Charges Onetime API
app.post('/product/pricegroup/charges/onetime/information', [authentication.authUser, productPriceGroupMiddleWare.productsPriceGroupOnetimeMiddleWareValidation], (req, res, next) => {
  productPriceChargesGroup.chargesGroupOneTime(req, res);
});

// Products Create New PriceGroup Charges Subscription API
app.post('/product/pricegroup/charges/subscription/information', [authentication.authUser, productPriceGroupMiddleWare.productsPriceGroupSubscriptionMiddleWareValidation], (req, res, next) => {
  productPriceChargesGroup.chargesGroupSubscription(req, res);
});

// Products Create New PriceGroup Charges Usages API
app.post('/product/pricegroup/charges/usages/information', [authentication.authUser, productPriceGroupMiddleWare.productsPriceGroupUsagesMiddleWareValidation], (req, res, next) => {
  productPriceChargesGroup.chargesGroupUsage(req, res);
});

// Products Get PriceGroup Charges Information API
app.post('/product/pricegroup/charges/information', authentication.authUser, (req, res, next) => {
  productPriceChargesGroup.getPriceGroupChargesInformation(req, res);
});

// Products - Get All the Coupons
app.get('/product/coupon/list', authentication.authUser, (req, res, next) => {
  couponDetails.getAllCoupons(req, res);
});

// Products - Create Coupons API
app.post('/product/create/coupon', [authentication.authUser, productsCouponMiddleware.productsCouponMiddleWareValidation], (req, res, next) => {
  couponDetails.createCoupons(req, res);
});

// Products - List Single Coupons API
app.get('/product/list/coupon/:id', authentication.authUser, (req, res, next) => {
  couponDetails.couponsListById(req, res);
});

// Products - Update Coupons API
app.post('/product/update/coupon/:id', [authentication.authUser, productsCouponMiddleware.productsCouponMiddleWareValidation], (req, res, next) => {
  couponDetails.couponsUpdate(req, res);
});

// Products - Delete Coupons API
app.get('/product/delete/coupon/:id', authentication.authUser, (req, res, next) => {
  couponDetails.couponDeleteById(req, res);
});

// ======

// Products - Get All the Vouchers
app.get('/product/voucher/list', authentication.authUser, (req, res, next) => {
  voucherDetails.getAllVouchers(req, res);
});

// Products - Create Vouchers API
app.post('/product/create/voucher', [authentication.authUser, productsVoucherMiddleware.productsVoucherMiddleWareValidation], (req, res, next) => {
  voucherDetails.createVouchers(req, res);
});

// Products - List Single Vouchers API
app.get('/product/list/voucher/:id', authentication.authUser, (req, res, next) => {
  voucherDetails.vouchersListById(req, res);
});

// Products - Update Vouchers API
app.post('/product/update/voucher/:id', [authentication.authUser, productsVoucherMiddleware.productsVoucherMiddleWareValidation], (req, res, next) => {
  voucherDetails.vouchersUpdate(req, res);
});

// Products - Delete Vouchers API
app.get('/product/delete/voucher/:id', authentication.authUser, (req, res, next) => {
  voucherDetails.voucherDeleteById(req, res);
});

module.exports = app;
