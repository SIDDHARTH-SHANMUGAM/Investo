const express = require("express");
const stockRouter = express.Router();
const {authUser} = require('../middleware/AuthUser');
const {getAllStocks, purchaseStock, sellStock, getHistory , getHolding, getStock} = require('../Controllers/StockController')


// get
stockRouter.route('/getAllStocks').get(authUser, getAllStocks);
stockRouter.route('/getHolding').get(authUser, getHolding);
stockRouter.route('/getHistory').get(authUser, getHistory);

// post
stockRouter.route('/getStock').post(authUser, getStock);

// put
stockRouter.route('/purchaseStock').put(authUser, purchaseStock);
stockRouter.route('/sellStock').put(authUser, sellStock);


module.exports = stockRouter;