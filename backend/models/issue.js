const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var issueschema = new mongoose.Schema({

title:{
  type: String
},
responsible:{
  type: String
},
description:{
  type: String
},
severity:{
  type: String
},
status:{
  type: String,
  default: 'Open'
}
});

var Issue = mongoose.model('Issue', issueschema);
module.exports = Issue;
