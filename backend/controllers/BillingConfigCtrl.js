const mongoose = require('mongoose');

require('../models/billinginformationconfig.js');

const Billingconfig = mongoose.model('Billinginformationconfig');

// Create Billing Config Data
exports.configCreateBillingConfig = async (req, res, next) => {
  //console.log(JSON.stringify(req.body));
  const flag_db_exist = await Billingconfig.findOne({});
  if(flag_db_exist == null){
    await Billingconfig.create({
      "dropdown": "billinginformation",
      "billing_currency": [],
      "billingday": [],
      "billingbatch": [],
      "inv_language": [],
      "inv_template": [],
      "inv_deliverytype": ["email", "mail", "NoRequire"],
      "paymentafter": [],
    });
  }

  if(req.body['which'] == "currency"){
    const Billing = await Billingconfig.findOne({});
    temp_arr = Billing.billing_currency;
    temp_arr.push({"description":req.body.newData['description'],"currency_code":req.body.newData['currency_code'],"isActive":(req.body.newData['isActive'] == "Yes" ? "Yes" : "No")});
    Billing.billing_currency = temp_arr;
    let rtn = await Billing.save();
    res.send(rtn);
  } 
  if(req.body['which'] == "day"){
    const Billing = await Billingconfig.findOne({});
    temp_arr = Billing.billingday;
    temp_arr.push({"day":req.body.newData['name'],"isActive":(req.body.newData['isActive'] == "Yes" ? "Yes" : "No")});
    Billing.billingday = temp_arr;
    let rtn = await Billing.save();
    res.send(rtn);
  } 
  if(req.body['which'] == "batch"){
    const Billing = await Billingconfig.findOne({});
    temp_arr = Billing.billingbatch;
    temp_arr.push({"name":req.body.newData['name'],"isActive":(req.body.newData['isActive'] == "Yes" ? "Yes" : "No")});
    Billing.billingbatch = temp_arr;
    let rtn = await Billing.save();
    res.send(rtn);
  } 
  if(req.body['which'] == "language"){
    const Billing = await Billingconfig.findOne({});
    temp_arr = Billing.inv_language;
    temp_arr.push({"name":req.body.newData['name'],"isActive":(req.body.newData['isActive'] == "Yes" ? "Yes" : "No")});
    Billing.inv_language = temp_arr;
    let rtn = await Billing.save();
    res.send(rtn);
  } 
  if(req.body['which'] == "template"){
    const Billing = await Billingconfig.findOne({});
    temp_arr = Billing.inv_template;
    temp_arr.push({"name":req.body.newData['name'],"isActive":(req.body.newData['isActive'] == "Yes" ? "Yes" : "No")});
    Billing.inv_template = temp_arr;
    let rtn = await Billing.save();
    res.send(rtn);
  } 
  if(req.body['which'] == "payment"){
    const Billing = await Billingconfig.findOne({});
    temp_arr = Billing.paymentafter;
    temp_arr.push({"name":req.body.newData['name'],"isActive":(req.body.newData['isActive'] == "Yes" ? "Yes" : "No")});
    Billing.paymentafter = temp_arr;
    let rtn = await Billing.save();
    res.send(rtn);
  } 
};

// Read Billing Config
exports.configReadBillingConfig = async (req, res, next) => {
    //console.log(JSON.stringify(req.body)); 
    await Billingconfig.find({}, (err, result) => {
      ////console.log(result);
      ////console.log(result.length);
      if (result.length== "0") {
        // return res.status(401).send('No Data');
      }
      else  {
          var BillingResult = JSON.stringify(result);
          BillingResult = BillingResult.replace(/(^\[)/, '');
          BillingResult = BillingResult.replace(/(\]$)/, '');
          try {
             var temp_data=JSON.parse(BillingResult);
              if (req.body['which'] == "currency"){
                 var rtn_data = temp_data['billing_currency'];
                 //console.log(rtn_data);
                return res.json(rtn_data);
              } 
              else if (req.body['which'] == "day"){
                var rtn_data = temp_data['billingday'];
                //console.log(rtn_data);
                return res.json(rtn_data);
              }
              else if (req.body['which'] == "batch"){
                var rtn_data = temp_data['billingbatch'];
                //console.log(rtn_data);
                return res.json(rtn_data);
              }
              else if (req.body['which'] == "language"){
                var rtn_data = temp_data['inv_language'];
                //console.log(rtn_data);
                return res.json(rtn_data);
              }
              else if (req.body['which'] == "template"){
                var rtn_data = temp_data['inv_template'];
                //console.log(rtn_data);
                return res.json(rtn_data);
              }
              else if (req.body['which'] == "payment"){
                var rtn_data = temp_data['paymentafter'];
                //console.log(rtn_data);
                return res.json(rtn_data);
              }
            } catch(e) {
              return res.status(401).send('Invalid Data');
          }
        }
    });
  };

  // Update Billing Config Data
exports.configUpdateBillingConfig = async (req, res, next) => {
  //console.log(JSON.stringify(req.body));
  // const Billings = await Billingconfig.find();
  // const Billing = Billings[0];
  // Billing.billing_currency = ['a', 'b', 'c', 'd'];
  // Billing.save()
  // return res.status(401).send('Invalid Data');

  if(req.body['which'] == "currency"){
    let rtn = await Billingconfig.update(
      { "billing_currency.description": req.body.oldData['description'] }, 
      { "$set": { "billing_currency.$.description": req.body.newData['description'],"billing_currency.$.currency_code": req.body.newData['currency_code'], "billing_currency.$.isActive": req.body.newData['isActive'] }}, 
    )  
    res.send(rtn);
  } 
  else if(req.body['which'] == "day"){
    let rtn = await Billingconfig.update(
      { "billingday.day": req.body.oldData['day'] }, 
      { "$set": { "billingday.$.day": req.body.newData['day'], "billingday.$.isActive": req.body.newData['isActive'] }}, 
    )  
    res.send(rtn);
  } 
  else if(req.body['which'] == "batch"){
    let rtn = await Billingconfig.update(
      { "billingbatch.name": req.body.oldData['name'] }, 
      { "$set": { "billingbatch.$.name": req.body.newData['name'], "billingbatch.$.isActive": req.body.newData['isActive'] }}, 
    )  
    res.send(rtn);
  } 
  else if(req.body['which'] == "language"){
    let rtn = await Billingconfig.update(
      { "inv_language.name": req.body.oldData['name'] }, 
      { "$set": { "inv_language.$.name": req.body.newData['name'], "inv_language.$.isActive": req.body.newData['isActive'] }}, 
    )  
    res.send(rtn);
  } 
  else if(req.body['which'] == "template"){
    let rtn = await Billingconfig.update(
      { "inv_template.name": req.body.oldData['name'] }, 
      { "$set": { "inv_template.$.name": req.body.newData['name'], "inv_template.$.isActive": req.body.newData['isActive'] }}, 
    )  
    res.send(rtn);
  } 
  else if(req.body['which'] == "payment"){
    let rtn = await Billingconfig.update(
      { "paymentafter.name": req.body.oldData['name'] }, 
      { "$set": { "paymentafter.$.name": req.body.newData['name'], "paymentafter.$.isActive": req.body.newData['isActive'] }}, 
    )  
    res.send(rtn);
  } 
};

// Delete Billing Config Data
exports.configDeleteBillingConfig = async (req, res, next) => {
  //console.log(JSON.stringify(req.body));

    const Billing = await Billingconfig.findOne({});
    if(req.body['which'] == "currency")
      temp_arr = Billing.billing_currency;
    else if(req.body['which'] == "day")
      temp_arr = Billing.billingday;
    else if(req.body['which'] == "batch")
      temp_arr = Billing.billingbatch;
    else if(req.body['which'] == "language")
      temp_arr = Billing.inv_language;
    else if(req.body['which'] == "template")
      temp_arr = Billing.inv_template;
    else if(req.body['which'] == "payment")
      temp_arr = Billing.paymentafter;
      
    del_val = req.body.deleted_Data['name'];
    index = temp_arr.map(x => {
      return x.name;
    }).indexOf(del_val);
    temp_arr.splice(index, 1);

    if(req.body['which'] == "currency")
      Billing.billing_currency = temp_arr;
    else if(req.body['which'] == "day")
      Billing.billingday = temp_arr;
    else if(req.body['which'] == "batch")
      Billing.billingbatch = temp_arr;
    else if(req.body['which'] == "language")
      Billing.inv_language = temp_arr;
    else if(req.body['which'] == "template")
      Billing.inv_template = temp_arr;
    else if(req.body['which'] == "payment")
      Billing.paymentafter = temp_arr;
      
    let rtn = await Billing.save();
    res.send(rtn);
  
};

