import cron from 'node-cron';
import Reminder from '../model/reminderModel.js';

const scheduleReminder = (reminder) => {
    const time = new Date(reminder.time);

    if (time < new Date()) return;

    switch(reminder.frequency) {
        case 'once': {
            const cronTime = `${time.getSeconds()} ${time.getMinutes()} ${time.getHours()} * * *`;
            const job = cron.schedule(cronTime, async () => {
                console.log(`[Once]⏰ ${reminder.message}`);
                
                job.stop();
            }, { timezone: 'Africa/Accra'});
            break;
        }

        case 'daily': {
            const cronTime = `${time.getSeconds()} ${time.getMinutes()} ${time.getHours()} * * *`;
            cron.schedule(cronTime, () => {
                console.log(`[Daily]⏰ ${reminder.message}`);
            }, { timezone: 'Africa/Accra'});
            break;
        }

        case 'weekly': {
            const cronTime = `${time.getSeconds()} ${time.getMinutes()} ${time.getHours()} * * ${time.getDay()}`;
            cron.schedule(cronTime, () => {
                console.log(`[Weekly] ${reminder.message}`);
            }, { timezone: 'Africa/Accra'});
            break;
        }

        case 'monthly': {
            const cronTime = `${time.getSeconds()} ${time.getMinutes()} ${time.getHours()} ${time.getDate()} * *`;
            cron.schedule(cronTime, () => {
                console.log(`[Monthly]⏰ ${reminder.message}`);
            }, { timezone: 'Africa/Accra'});
            break;
        }

        case 'hourly': {
            const cronTime = `${time.getSeconds()} ${time.getMinutes()} * * * *`;
            cron.schedule(cronTime, () => {
                console.log(`[Hourly]⏰ ${reminder.message}`);
            }, { timezone: 'Africa/Accra'});
            break;
        }

        default: {
            if( reminder.frequency.startsWith('interval-')){
                const minutes = parseInt(reminder.frequency.split('-')[1]);
                const intervalMs = minutes * 60 *1000;

                setInterval(() => {
                    console.log(`[Interval-${minutes}]⏰ ${reminder.message}`)
                }, intervalMs);
            }
            break;
        }
    }
};


const scheduleReminders = async () => {
    try{
        const reminders = await Reminder.find();
        reminders.forEach(scheduleReminder);
        console.log('All reminders scheduled! 👌');
    }catch(err){
        console.log('Error scheduling reminders: ', err);
    }
};

export default scheduleReminders;