const jwt = require('jsonwebtoken');

const authUser= async(req, res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;
        next();
    }
    catch(err)
    {
        res.json({message :"Authentication Failed"});
    }
}

module.exports = {authUser};
