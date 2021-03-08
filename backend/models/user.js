const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userschema = new mongoose.Schema({
  cloudid: {
    type: String
  },
  companyname: {
    type: String
  },
  user: {
    type: String
  },
  password: {
    type: String
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  token: {
    type: String
  }
});

var User = mongoose.model('User', userschema);
module.exports = User;
