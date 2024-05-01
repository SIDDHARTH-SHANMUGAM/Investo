const mongoose = require("mongoose")

const HoldingSchema = new mongoose.Schema(
    {
        userId: {
            type: Number,
            required: true
        },
        stockId:{
            type: String,
            required: true
        },
        quantity:{
            type: Number,
            required: true
        }
    }
)


const Holding = mongoose.model("holdings", HoldingSchema);

module.exports = Holding