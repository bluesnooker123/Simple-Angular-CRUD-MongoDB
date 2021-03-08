const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var accountconfig = new mongoose.Schema({
  dropdown: {
    type: String
  },
  companytype: {
    type: Array
  },
  industrytype: {
    type: Array
  },
  creditrating: {
    type: Array
  }
});

var Accountconfig = mongoose.model('Accountconfig', accountconfig);
module.exports = Accountconfig;
