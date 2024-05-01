const Razorpay = require('razorpay');
const crypto = require('crypto');

const payment=  async (req, res) => {
  try {

    const options = req.body;
    const pay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    await pay.orders.create(options).then(resolve=>{
      res.json({message: 'order success', order: resolve});
    }).catch( err =>{
      res.json({"Error": err});
    })

  } catch (err) {
    res.status(500).json({"Error":err});
  }
};

const validate = async (req, res) => {
  try{
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body.body;

    const temp = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    temp.update(`${razorpay_order_id}|${razorpay_payment_id}`);

    const digestKey = temp.digest("hex");

    if(digestKey === razorpay_signature) {
      res.json({
        message: "success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });
    }
    else
    {
      res.status(400).json({ message: "Unlegitable" });
    }
  }
  catch(e)
  {
    console.log(e);
  }
};

module.exports = {payment, validate};