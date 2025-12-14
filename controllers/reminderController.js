import Reminder from './../model/reminderModel.js';

// CREATE REMINDER
export const createReminder = async (req, res) => {
  try {
    const { message, time, frequency } = req.body;

    const reminder = await Reminder.create({
      userId: req.user._id, 
      message,
      time,
      frequency
    });

    res.status(201).json({
      status: 'success',
      data: {
        reminder
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// GET ALL REMINDERS FOR LOGGED-IN USER
export const getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user._id });

    res.status(200).json({
      status: 'success',
      results: reminders.length,
      data: {
        reminders
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// GET SINGLE REMINDER BY ID (must belong to user)
export const getReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!reminder) {
      return res.status(404).json({
        status: 'fail',
        message: 'Reminder not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        reminder
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// UPDATE REMINDER BY ID 
export const updateReminder = async (req, res) => {
  try {
    const { message, time, frequency } = req.body;

    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { message, time, frequency },
      { new: true, runValidators: true }
    );

    if (!reminder) {
      return res.status(404).json({
        status: 'fail',
        message: 'Reminder not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        reminder
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// DELETE REMINDER BY ID 
export const deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!reminder) {
      return res.status(404).json({
        status: 'fail',
        message: 'Reminder not found'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
