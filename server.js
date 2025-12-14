import app from './app.js';
import connectDB  from './config/db.js';
import scheduleReminders from './config/schedule.js';

import dotenv from 'dotenv';
dotenv.config();

const startServer = async() => {
    try{
        // CONNECT TO DATABASE
        await connectDB();

        //START REMINDERS
        await scheduleReminders();

        const port = process.env.PORT || 3000;
        app.listen(port, ()=>{ 
        console.log(`Server is running on port ${port}`);
        });
        }catch(err){
        console.log('Error💥: ', err.message);
    }
}

startServer();
