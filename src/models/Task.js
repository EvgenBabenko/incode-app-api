const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, maxlength: 50 },
  description: String,
  status: String,
  createdAt: { type: Date, default: new Date() },
  // createdForID: { type: Schema.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model('Task', TaskSchema);
