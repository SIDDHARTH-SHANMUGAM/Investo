const express = require("express");
const paymentRouter = express.Router();
const {payment, validate} = require('../Controllers/PaymentController');


// post
paymentRouter.route('/pay').post(payment);
paymentRouter.route('/validate').post( validate);


module.exports = paymentRouter;