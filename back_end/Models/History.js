const mongoose = require("mongoose")

const HistorySchema = new mongoose.Schema(
    {
        userId: {
            type: Number,
            required: true
        },
        stockId:{
            type: String,
            required: true
        },
        isPurchased:{
            type: Boolean,
            required: true
        },
        quantity:{
            type: Number,
            required: true
        },
        prize: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)


const History = mongoose.model("history", HistorySchema);

module.exports = History