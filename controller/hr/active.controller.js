const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const Employee = require('../../models/employeeModel');

module.exports = async (req, res) =>{
    try {
        const token = req.header('authorization');
        const decode = jwt.decode(token);
        User.findOne({employeeId:decode.employeeId},
            async(e,d)=>{
            if(e) return res.status(400).send({type: 'error', message: e.message});
            else{
                const validPass = await bcrypt.compare(req.body.password, d.passwordHash);
                if(!validPass) res.send('Access Denied');
                else{
                    Employee.findOneAndUpdate(
                        {employeeId:req.body.employeeId},
                        {status: 'ACTIVE'},{
                        runValidators:true,new:true},
                        async(err,data)=>{
                        if (err) res.status(400).send(err); 
                        else {
                            const salt = await bcrypt.genSalt();
                            const passwordHash = await bcrypt.hash(req.body.employeeId, salt);
                            await User.create({employeeId:req.body.employeeId, passwordHash}, async(er,dt)=>{
                                if(er) res.status(400).send(err);
                                else res.status(200).send('User Activated');
                            });
                            res.status(200).send(data);
                        }
                    })
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({type: 'error', message: 'something went wrong at server'});
    }
}
