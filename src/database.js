
const mongoose = require('mongoose');
const URI = 'your connection string;

mongoose.connect(URI)
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;
