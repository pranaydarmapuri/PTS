const mongoose = require('mongoose')

module.exports = mongoose.model('SubTask', new mongoose.Schema({
    taskId: {
        type: String,
        required: true
    },
    subTaskId: {
        type: String,
        unqiue: [true, 'Already exists'],
        required: true
    },
    subTaskDesc: {
        type: String
    },
    priority: {
        type: String,
        validate: {
            validator: value => ['LOW', 'NORMAL', 'HIGH'].includes(value),
            message: 'Invalid Priority'
        }
    }
}))