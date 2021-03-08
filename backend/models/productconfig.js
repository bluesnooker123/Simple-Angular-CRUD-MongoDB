const mongoose = require('mongoose');
const { stringify } = require('querystring');

var tenantconfig = new mongoose.Schema({
  dropdown: {
    type: String
  },
  taxcodetype: {
    type: Array
  },
  taxmodetype: {
    type: Array
  }
});

var Tenantconfig = mongoose.model('Tenantconfig', tenantconfig);
module.exports = Tenantconfig;
