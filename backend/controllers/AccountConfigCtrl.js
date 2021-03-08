const mongoose = require('mongoose');

require('../models/accountconfig.js');

const Accountconfig = mongoose.model('Accountconfig');

// Create Account Config Data
exports.configCreateAccountConfig = async (req, res, next) => {
  ////console.log(JSON.stringify(req.body));

  const flag_db_exist = await Accountconfig.findOne({});
  if(flag_db_exist == null){
    await Accountconfig.create({
      "companytype": [],
      "industrytype": [],
      "creditrating": [],
      "dropdown": "accounts",
    });
  }

  if(req.body['which'] == "company"){
    const account = await Accountconfig.findOne({});
    temp_arr = account.companytype;
    temp_arr.push({"name":req.body.newData['name'],"isActive":(req.body.newData['isActive'] == "Yes" ? "Yes" : "No")});
    account.companytype = temp_arr;
    let rtn = await account.save();
    res.send(rtn);
  } 
  if(req.body['which'] == "industry"){
    const account = await Accountconfig.findOne({});
    temp_arr = account.industrytype;
    temp_arr.push({"name":req.body.newData['name'],"isActive":(req.body.newData['isActive'] == "Yes" ? "Yes" : "No")});
    account.industrytype = temp_arr;
    let rtn = await account.save();
    res.send(rtn);
  } 
  if(req.body['which'] == "credit"){
    const account = await Accountconfig.findOne({});
    temp_arr = account.creditrating;
    temp_arr.push({"name":req.body.newData['name'],"isActive":(req.body.newData['isActive'] == "Yes" ? "Yes" : "No")});
    account.creditrating = temp_arr;
    let rtn = await account.save();
    res.send(rtn);
  } 
};

// Read Account Config
exports.configReadAccountConfig = async (req, res, next) => {
//    //console.log(JSON.stringify(req.body)); 
    await Accountconfig.find({}, (err, result) => {
      ////console.log(result);
      ////console.log(result.length);
      if (result.length== "0") {
        //return res.status(401).send('No Data');
      }
      else  {
          var AccountResult = JSON.stringify(result);
          AccountResult = AccountResult.replace(/(^\[)/, '');
          AccountResult = AccountResult.replace(/(\]$)/, '');
          try {
             var temp_data=JSON.parse(AccountResult);
             if (req.body['which'] == "company"){
                 var rtn_data = temp_data['companytype'];
//                 //console.log(rtn_data);
                return res.json(rtn_data);
             } 
             else if (req.body['which'] == "industry"){
                var rtn_data = temp_data['industrytype'];
                ////console.log(rtn_data);
                return res.json(rtn_data);
             } else if (req.body['which'] == "credit"){
                var rtn_data = temp_data['creditrating'];
//                //console.log(rtn_data);
                return res.json(rtn_data);
             }
          } catch(e) {
              return res.status(401).send('Invalid Data');
          }
        }
    });
  };

  // Update Account Config Data
exports.configUpdateAccountConfig = async (req, res, next) => {
  //console.log(JSON.stringify(req.body));
  // const accounts = await Accountconfig.find();
  // const account = accounts[0];
  // account.companytype = ['a', 'b', 'c', 'd'];
  // account.save()
  // return res.status(401).send('Invalid Data');

  if(req.body['which'] == "company"){
    let rtn = await Accountconfig.update(
      { "companytype.name": req.body.oldData['name'] }, 
      { "$set": { "companytype.$.name": req.body.newData['name'], "companytype.$.isActive": req.body.newData['isActive'] }}, 
    )  
    res.send(rtn);
  } 
  else if(req.body['which'] == "industry"){
    let rtn = await Accountconfig.update(
      { "industrytype.name": req.body.oldData['name'] }, 
      { "$set": { "industrytype.$.name": req.body.newData['name'], "industrytype.$.isActive": req.body.newData['isActive'] }}, 
    )  
    res.send(rtn);
  } 
  else if(req.body['which'] == "credit"){
    let rtn = await Accountconfig.update(
      { "creditrating.name": req.body.oldData['name'] }, 
      { "$set": { "creditrating.$.name": req.body.newData['name'], "creditrating.$.isActive": req.body.newData['isActive'] }}, 
    )  
    res.send(rtn);
  } 
};

// Delete Account Config Data
exports.configDeleteAccountConfig = async (req, res, next) => {
   //console.log(JSON.stringify(req.body));
    const account = await Accountconfig.findOne({});
    if(req.body['which'] == "company")
      temp_arr = account.companytype;
    else if(req.body['which'] == "industry")
      temp_arr = account.industrytype;
    else if(req.body['which'] == "credit")
      temp_arr = account.creditrating;
      
    del_val = req.body.deleted_Data['name'];
    index = temp_arr.map(x => {
      return x.name;
    }).indexOf(del_val);
    temp_arr.splice(index, 1);

    let which_str = "";
    if(req.body['which'] == "company"){
      account.companytype = temp_arr;
      which_str = "companytype";
    }
    else if(req.body['which'] == "industry"){
      account.industrytype = temp_arr;
      which_str = "industrytype";
    }
    else if(req.body['which'] == "credit"){
      account.creditrating = temp_arr;
      which_str = "creditrating";
    }
      
    // let rtn = await account.save()
    account.save()
    .then((rtn) => {
      let cur_time = new Date().toLocaleString();
      console.log("User ID: " + req.body.user_id + " ===> '" + req.body.deleted_Data['name'] + "' deleted from accountconfigs/" + which_str + " at " + cur_time);
      res.send(rtn);
    })
    .catch((error) => {
        console.log(error);
        res.send(400, "Bad Request");
    });

  
};

