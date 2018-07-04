const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');

mongoose.connect(MONGODB_URI)
  .then(() => { console.log('Successfully connected to the database'); })
  .catch((err) => {
    console.log(`Could not connect to the database. Exiting now...
    ${err}`);
    process.exit();
  });
mongoose.Promise = global.Promise;
