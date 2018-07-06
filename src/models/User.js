const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfileSchema = {
  avatar: { type: String, default: '' },
  firstName: { type: String, trim: true, default: '' },
  lastName: { type: String, trim: true, default: '' },
  dateOfBirth: { type: String, default: '' },
  gender: { type: String, default: '' },
  address: { type: String, trim: true, default: '' },
  phoneNumber: { type: String, trim: true, default: '' },
  skills: { type: String, trim: true, default: '' },
  experience: { type: String, trim: true, default: '' },
};

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile: ProfileSchema,
  role: { type: String, default: 'user' }
});

module.exports = mongoose.model('User', UserSchema);
