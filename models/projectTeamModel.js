const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    taskRef:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ProjectTask',
        required: true
    },
    teamLeader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    teamMemmers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee',
            required: true
        }
    ]
},
{
    collection:'projectTeam'
});

module.exports = mongoose.model("ProjectTeam", projectTeamSchema);
