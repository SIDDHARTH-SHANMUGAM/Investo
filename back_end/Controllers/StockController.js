const Stock = require('../Models/Stocks');
const History = require('../Models/History');
const Holding = require('../Models/Holdings');

const getAllStocks = async(req, res)=> {
  try{
    const stocks = await Stock.find();
    res.json({message : "got", stocks: stocks});
  }
  catch(err)
  {
    res.json({message: "err", error: err});
  }

}

const purchaseStock = async(req, res) =>{
   try {
        const {stockId, quantity} = req.body;
        const userId = req.userId;

        const stock = await Stock.findOne({stockId:stockId});

        if(!stock){
            return res.json({ message: "Stock not found" });
        }
         let holding = await Holding.findOne({ userId, stockId });

        if(!holding){
            holding = new Holding({
                userId: userId,
                stockId: stockId,
                quantity: quantity
            });
        }
        else {
            holding.quantity += quantity;
        }
        await holding.save();

        if(stock&&stock.prize)
        {
          const newHistory = new History({
              userId: userId,
              stockId: stockId,
              isPurchased: true,
              quantity: quantity,
              prize: stock.prize
          });
          await newHistory.save();
          res.json({ message: "added"});
        }

    } catch (err) {
        res.json({ message: "Error", error: err });
    }
}

const sellStock = async (req, res) => {
    try {
        const { stockId, quantity } = req.body;
        const userId = req.userId;

        const stock = await Stock.findOne({ stockId });

        if (!stock) {
            return res.json({ message: "Stock not found" });
        }

        let holding = await Holding.findOne({ userId, stockId });

        if (!holding || holding.quantity < quantity) {
            return res.json({ message: "Insufficient stocks" });
        }
        holding.quantity -= quantity;
        await holding.save();
        const newHistory = new History({
            userId: userId,
            stockId: stockId,
            isPurchased: false,
            quantity: quantity,
            prize: stock.prize
        });
        await newHistory.save();

        res.json({ message: "sold" });
    }
    catch (e) {
    res.json({message: "error", error: e});
    }
};

const getHolding= async(req, res)=>{
  try {
    const userId = req.userId;
    const holdings = await Holding.find({userId});
    if(holdings)
    {
      res.json({message: "got", holding: holdings})
    }
    else
      res.json({message: "not available"});

  } 
  catch (e) {
    res.json({message: "error", error: e});
  }
  
}


const getHistory= async(req, res)=>{
  try {
    const userId = req.userId;
    const history = await History.find({userId});
    if(history)
    {
      res.json({message: "got", history: history})
    }
    else
      res.json({message: "not available"});

  } 
  catch (e) {
    res.json({message: "error", error: e});
  }
}
const getStock = async(req, res)=>{
  const {stockId} = req.body;
  try{
    const stock = await Stock.findOne({stockId: stockId});
    if(stock)
    {
      res.json({message: "got", stock: stock});
    }
    else
      res.json({message: "not available"});

  }
  catch(e){
    res.json({message: "error", error: e});
  }
}




module.exports= {getAllStocks, purchaseStock, sellStock, getHolding, getHistory, getStock};