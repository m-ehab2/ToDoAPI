const schedule = require('node-schedule');
const Todo = require('../Models/ToDo');
const { decodeReqHeader } = require('../Utilities/TokenUtils');
const List = require('../Models/List');

const sendNotification = (todo) => {
    console.log(`Sending notification for todo: ${todo.task}`);
};

const scheduleNotifications = async (req) => {
    try {
        const { userId } = decodeReqHeader(req);
        // console.log(userId);
        const lists = await List.find({ user: userId });
        // console.log(lists);
        let todos = []
        for (const list of lists) {
            todos.push(...await Todo.find({ list: list._id }));
        }
        console.log(todos);
        todos.forEach(todo => {
            const dueDate = new Date(todo.dueDate);
            const cronExpression = `${dueDate.getSeconds()} ${dueDate.getMinutes()} ${dueDate.getHours()} * * *`;
            console.log(cronExpression);
            schedule.scheduleJob(cronExpression, () => {
                console.log('Scheduled Task for:', todo.task);
                sendNotification(todo);
            });
        });

        console.log('Notifications scheduled successfully');
    } catch (error) {
        console.error('Error scheduling notifications:', error);
    }
};
// const schedulerTest = async () => {
//     console.log('Started Scheduler');
//     schedule.scheduleJob('5 * * * * *', () => {
//         console.log('Scheduled Task');
//     });
// }

module.exports = { scheduleNotifications };
