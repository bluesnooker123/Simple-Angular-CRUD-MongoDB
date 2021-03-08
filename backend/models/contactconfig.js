const mongoose = require('mongoose');

var countryconfig = new mongoose.Schema({
  dropdown: {
    type: String
  },
  countries: {
    type: Array
  }
});

var Countryconfig = mongoose.model('Contactconfig', countryconfig);
module.exports = Countryconfig;
