const Profile = {
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

module.exports = Profile;
