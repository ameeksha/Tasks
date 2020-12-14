const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Task = new mongoose.model('Task', taskSchema);

module.exports = Task;