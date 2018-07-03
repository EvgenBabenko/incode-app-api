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
