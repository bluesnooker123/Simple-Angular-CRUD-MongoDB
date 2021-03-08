const mongoose = require('mongoose');

require('../models/paymentconfig.js');

const Paymentconfig = mongoose.model('Paymentconfig');

// Create Payment Config Data
exports.configCreatePaymentConfig = async (req, res, next) => {
  //console.log(JSON.stringify(req.body));
  const flag_db_exist = await Paymentconfig.findOne({});
  if(flag_db_exist == null){
    await Paymentconfig.create({
      "dropdown": "payment",
      "payment_getway": [],
      "payment_type": [],
    });
  }

  if(req.body['which'] == "getway"){
    const Payment = await Paymentconfig.findOne({});
    temp_arr = Payment.payment_getway;
    temp_arr.push({"name":req.body.newData['name'],"isActive":(req.body.newData['isActive'] == "Yes" ? "Yes" : "No")});
    Payment.payment_getway = temp_arr;
    let rtn = await Payment.save();
    res.send(rtn);
  } 
  if(req.body['which'] == "type"){
    const Payment = await Paymentconfig.findOne({});
    temp_arr = Payment.payment_type;
    temp_arr.push({"name":req.body.newData['name'],"isActive":(req.body.newData['isActive'] == "Yes" ? "Yes" : "No")});
    Payment.payment_type = temp_arr;
    let rtn = await Payment.save();
    res.send(rtn);
  } 
};

// Read Payment Config
exports.configReadPaymentConfig = async (req, res, next) => {
    //console.log(JSON.stringify(req.body)); 
    await Paymentconfig.find({}, (err, result) => {
      ////console.log(result);
      ////console.log(result.length);
      if (result.length== "0") {
        // return res.status(401).send('No Data');
      }
      else  {
          var PaymentResult = JSON.stringify(result);
          PaymentResult = PaymentResult.replace(/(^\[)/, '');
          PaymentResult = PaymentResult.replace(/(\]$)/, '');
          try {
             var temp_data=JSON.parse(PaymentResult);
             if (req.body['which'] == "getway"){
                 var rtn_data = temp_data['payment_getway'];
                 //console.log(rtn_data);
                return res.json(rtn_data);
             } 
             else if (req.body['which'] == "type"){
                var rtn_data = temp_data['payment_type'];
                //console.log(rtn_data);
                return res.json(rtn_data);
             }
          } catch(e) {
              return res.status(401).send('Invalid Data');
          }
        }
    });
  };

  // Update Payment Config Data
exports.configUpdatePaymentConfig = async (req, res, next) => {
  //console.log(JSON.stringify(req.body));
  // const Payments = await Paymentconfig.find();
  // const Payment = Payments[0];
  // Payment.payment_getway = ['a', 'b', 'c', 'd'];
  // Payment.save()
  // return res.status(401).send('Invalid Data');

  if(req.body['which'] == "getway"){
    let rtn = await Paymentconfig.update(
      { "payment_getway.name": req.body.oldData['name'] }, 
      { "$set": { "payment_getway.$.name": req.body.newData['name'], "payment_getway.$.isActive": req.body.newData['isActive'] }}, 
    )  
    res.send(rtn);
  } 
  else if(req.body['which'] == "type"){
    let rtn = await Paymentconfig.update(
      { "payment_type.name": req.body.oldData['name'] }, 
      { "$set": { "payment_type.$.name": req.body.newData['name'], "payment_type.$.isActive": req.body.newData['isActive'] }}, 
    )  
    res.send(rtn);
  } 
};

// Delete Payment Config Data
exports.configDeletePaymentConfig = async (req, res, next) => {
  //console.log(JSON.stringify(req.body));

    const Payment = await Paymentconfig.findOne({});
    if(req.body['which'] == "getway")
      temp_arr = Payment.payment_getway;
    else if(req.body['which'] == "type")
      temp_arr = Payment.payment_type;
      
    del_val = req.body.deleted_Data['name'];
    index = temp_arr.map(x => {
      return x.name;
    }).indexOf(del_val);
    temp_arr.splice(index, 1);

    if(req.body['which'] == "getway")
      Payment.payment_getway = temp_arr;
    else if(req.body['which'] == "type")
      Payment.payment_type = temp_arr;
      
    let rtn = await Payment.save();
    res.send(rtn);
  
};

