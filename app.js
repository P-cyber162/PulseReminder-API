import express from 'express';
import authRoutes from './routes/authRoutes.js';
import reminderRoutes from './routes/reminderRoute.js';

const app = express();

app.use(express.json());  

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/reminders', reminderRoutes);

// GLOBAL ERROR HANDLING MIDILWARE
app.use((err, req, res, next) => {
  console.error('GLOBAL ERROR:', err);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Something went wrong!'
  });
});

export default app;


