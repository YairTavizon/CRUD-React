
const mongoose = require('mongoose');
const URI = 'mongodb://YairTav:hola1234@ds119598.mlab.com:19598/people';

mongoose.connect(URI)
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;