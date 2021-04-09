const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    const token = req.header('authorization');
    if(!token) return res.status(401).send({ type:'error',message: 'Access Denied'});
    try {
        const verified = jwt.verify(token, process.env.SECRETKEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({type:'error', message:'Invalid Token'});
    }
};