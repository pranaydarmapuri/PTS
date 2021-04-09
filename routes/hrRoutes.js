const express = require("express");
const router = express.Router();

const jwt = require('jsonwebtoken');

const verify = function (req,res,next){
    const token = req.header('authorization');
    if(!token) return res.status(401).send({ type:'error',message: 'Access Denied'});
    try {
        const decode = jwt.decode(token);
        const verified = jwt.verify(token, process.env.SECRETKEY);
        if(decode.designation =='HR' ){
            req.user = verified;
            next();
        }
        else return res.status(401).send({ type:'error',message: 'Access Denied'});
            
    } catch (error) {
        console.log(error);
        res.status(400).send({type:'error', message:'Invalid Token'});
    }
};


//add Employee------------
router.post('/emp/add',verify, require('../controller/hr/add.controller'));

//update Employee-----------
router.post('/emp/update',verify, require('../controller/hr/update.controller'));
//delete Employe------------
router.post('/emp/remove',verify, require('../controller/hr/remove.controller'));
//active Employee--------
router.post('/emp/active',verify, require('../controller/hr/active.controller'));
module.exports = router;