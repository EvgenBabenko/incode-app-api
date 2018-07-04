const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
