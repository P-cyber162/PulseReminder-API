import express from 'express';
import { protect } from '../controllers/authController.js';
import {
  createReminder,
  getAllReminders,
  getReminder,
  updateReminder,
  deleteReminder
} from '../controllers/reminderController.js';

const router = express.Router();

router.use(protect); 

router
  .route('/')
  .post(createReminder)
  .get(getAllReminders);

router
  .route('/:id')
  .get(getReminder)
  .patch(updateReminder)
  .delete(deleteReminder);

export default router;
