const mongoose = require('mongoose');
const config = require('config');

const mongo = () => {
  mongoose.connect(config.DBHost, { useNewUrlParser: true })
    .then(() => { console.log('Successfully connected to the database'); })
    .catch((err) => {
      console.log(`Could not connect to the database. Exiting now...
    ${err}`);
      process.exit();
    });
};

module.exports = mongo;
