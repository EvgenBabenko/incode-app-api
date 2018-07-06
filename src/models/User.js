const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfileSchema = {
  avatar: { type: String },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  dateOfBirth: { type: String },
  gender: { type: String },
  address: { type: String, trim: true },
  phoneNumber: { type: String, trim: true },
  skills: { type: String, trim: true },
  experience: { type: String, trim: true },
};

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile: ProfileSchema,
});

module.exports = mongoose.model('User', UserSchema);
