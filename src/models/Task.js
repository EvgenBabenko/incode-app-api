const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: {
    type: String,
    maxlength: [50, 'Too long title, max length 50'],
    trim: true,
    required: true,
  },
  description: { type: String, trim: true, default: '' },
  status: { type: String, required: true, default: 'To do' },
  createdAt: { type: Date, required: true, default: new Date() },
  // createdForID: { type: String, required: true },
});

module.exports = mongoose.model('Task', TaskSchema);
