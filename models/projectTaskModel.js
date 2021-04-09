const mongoose = require("mongoose");

const projectTaskSchema = new mongoose.Schema({
    taskId:{
        type: String,
        required: true
    },
    taskDesc:{
        type: String,
    },
    priority:{
        type:String,
        validate:{
            validator: value =>[ 'Low', 'Normal', 'High'].includes(value),
            message: 'Invalid Priority'
        }
    },
    startDate:{
        type: Date,
        required:[true, ''],
        default: Date.now
    },
    endDate:{
        type: Date,
        required:[true, 'Required end date']
    },
    status:{
        type: String,
        required: true,
        validate: {
            validator: value => ["Not started","Active","On-hold","Completed"].includes(value),
            message: 'Invalid Status'
          }
    },
    projectRef:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project',
        required: true
    },

},
{
    collection:'projectTask'
});

module.exports = mongoose.model("ProjectTask", projectTaskSchema);
