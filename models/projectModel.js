const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectId:{
        type: String, 
        unique:[true, 'Already exixts'],
        required: true
    },
    projectDesc:{
        type: String,
    },
    managerID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    startDate:{
        type: Date,
        required:[true, '']
    },
    endDate:{
        type: Date,
        required:[true, '']
    }
}
,
{
    collection:'project'
}
);

module.exports = mongoose.model("Project", projectSchema);