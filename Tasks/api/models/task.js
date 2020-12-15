const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    task_name: {
        type: String,
        required: true,
        min:5,
        max:50
    },
    project_name: {
        type: String,
        required: true,
        min:5,
        max:50
    },
    status: {
        type: String,
        required: true,
    }
})

const Task = new mongoose.model('Task', taskSchema);

module.exports = Task;