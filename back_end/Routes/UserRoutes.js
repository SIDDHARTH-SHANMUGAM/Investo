const express = require("express");
const userRouter = express.Router();
const {authUser} = require('../middleware/AuthUser');
const {login, register, getUser} = require('../Controllers/UserController')


// get
userRouter.route('/getUser').get(authUser, getUser);
userRouter.route('/resetSession').get();

// post
userRouter.route('/register').post(register);
userRouter.route('/login').post(login);


module.exports = userRouter;