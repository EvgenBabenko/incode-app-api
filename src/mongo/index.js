const mongoose = require('mongoose');

class MongoManager {
  constructor(config) {
    this.config = config;
  }

  getMongoUrl() {
    return this.config.MONGODB_URI;
  }

  connect() {
    return mongoose.connect(this.getMongoUrl());
  }
}

module.exports = { MongoManager };

// mongoose.connect('mongodb://localhost:3001/mongoose-test')
// mongoose.connect(mongoUrl)
//   .then(() => { console.log('Successfully connected to the database'); })
//   .catch((err) => {
//     console.log('Could not connect to the database. Exiting now...');
//     process.exit();
//   });
