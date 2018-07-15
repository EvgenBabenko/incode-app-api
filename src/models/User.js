const mongoose = require('mongoose');

const Profile = require('./Profile');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: v => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(v),
      message: '{VALUE} is not a valid email!',
    },
  },
  password: { type: String, trim: true, required: true },
  profile: Profile,
  role: { type: String, required: true, default: 'user' },
});

module.exports = mongoose.model('User', UserSchema);
