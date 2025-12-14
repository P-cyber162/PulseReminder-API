import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Reminder must belong to a user']
  },
  message: {
    type: String,
    required: [true, 'A message must be provided']
  },
  time: {
    type: Date,
    required: [true, 'A date must be provided']
  },
  frequency: {
    type: String,
    enum: ['once', 'interval-1m', 'interval-5m', 'interval-10m', 'hourly', 'daily', 'weekly', 'monthly'],
    default: 'once'
  }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

export default Reminder;
