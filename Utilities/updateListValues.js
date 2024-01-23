const List = require("../Models/List");
const Todo = require("../Models/ToDo");


const updateList = async (listId) => {
    const TodosArray = await Todo.find({ list: listId });
    const currentDate = Date.now();
    let behindSchedule = false;
    let allDone = true;
    TodosArray.forEach((ele) => {
        if (ele.dueDate <= currentDate) {
            behindSchedule = true;
            console.log(behindSchedule);
        }
        if (ele.completed === false) {
            allDone = false;
        }
    })
    const list = await List.updateOne({ _id: listId }, { $set: { completionStatus: allDone ? 'All Done' : 'Not Done', scheduleStatus: behindSchedule ? 'Behind Schedule' : 'Ahead of Schedule', updatedAt: Date(currentDate) } });

}
module.exports = { updateList }