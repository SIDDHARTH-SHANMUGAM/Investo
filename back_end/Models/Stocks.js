const mongoose = require("mongoose")

const StockSchema = new mongoose.Schema(
    {
        stockId: {
            type: String,
            unique: true
        },
        companyName:{
            type: String,
            required: true
        },
        prize:{
            type: Number,
            required: true
        },
        icon:{
            type: String,
            required: true
        }
    }
)

const Stock = mongoose.model("stock", StockSchema);

module.exports = Stock