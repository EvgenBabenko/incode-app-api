const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: { type: String, maxlength: 50, required: true },
  description: String,
  status: String,
  createdAt: { type: Date, default: new Date() },
  createdByID: { type: String, required: true },
});

module.exports = mongoose.model('Task', TaskSchema);
