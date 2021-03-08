const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');

require('../../models/user.js');
require('../../models/issue.js');

const User = mongoose.model('User');
const Issue = mongoose.model('Issue');

// Registration
exports.registration = (req, res, next) => {
  var user = new User(req.body);
  user.save()
    .then(user => {
      res.status(200).json({'user': 'Added Successfully'});
    })
    .catch(err => {
      res.status(400).send('Failed to create new record');
  });
};

// Loging
exports.login = (req, res, next) => {
  var query = { user : req.body.user, password: req.body.password };
  console.log(query);

  User.find(query, (err, result) => {
    console.log(result);
    console.log(result.length);
    if (result.length== "0") {
      console.log('Invalid User');
      //res.json('Invalid user name and password');
      return res.status(401).send('Invalid User and/or Password.');
    }
    else  {
        var userResult = JSON.stringify(result);
        userResult = userResult.replace(/(^\[)/, '');
        userResult =  userResult.replace(/(\]$)/, '');
        try {
           var userdata=JSON.parse(userResult);
        } catch(e) {
            return res.status(401).send('Invalid User and/or Password.');
        }
        var cloudid =  userdata["cloudid"]
        var companyname =  userdata["companyname"]
        var userfirstName =  userdata["firstname"]
        var Superuser = userdata["superuser"]
        console.log(chalk.yellow(config.secret));
        var tokenExpiresTime = Math.floor(Date.now() / config.tokenExpires) + (60 * 60); //valid for 2 hr
        jwt.sign({user: req.body.user}, config.secret, {expiresIn: tokenExpiresTime}, (err, utoken) => {
          const response =  'cloudid:'+ cloudid;
            return res.json({
                cloudid: cloudid,
                user: req.body.user,
                firstname : userfirstName,
                token: utoken,
                companyname: companyname,
                isSuperUser: Superuser
            });
        });
      }
  });
};

// Add user
exports.add = (req, res, next) => {
  var issue = new Issue(req.body);
  issue.save()
       .then(issue => {
          res.status(200).json({'issue': 'Added Successfully'});
       })
       .catch(err => {
         res.status(400).send('Failed to create new record');
  });
};

// Get users
exports.getUsers = (req, res, next) => {
  Issue.find((err,issues)=> {
    if (err)
       console.log(err)
    else
      res.json(issues);
  });
};

// Get each users
exports.getEachUser = (req, res, next) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (err)
      console.log(err)
    else
      res.json(issue);
  });
};

// User Update
exports.userUpdate = (req, res, next) => {
  Issue.findById(req.params.id, ( err, issue) => {
    if (!issue)
      return onErrorResumeNext(new Error('Could not load document'));
    else  {
      issue.title = req.body.title;
      issue.responsible = req.body.responsible;
      issue.description = req.body.description;
      issue.severity  = req.body.severity;
      issue.status = req.body.status;
      issue.save().then( issue => {
          res.json('Update Done')

      }).catch(err => {
          res.status(400).send('Update Failed');
      });
    }
  });
};


// User Delete
exports.userDelete = (req, res, next) => {
  Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
    if (err)
      res.json(err);
    else
      res.json('Remove sucessfully');
  });
};

