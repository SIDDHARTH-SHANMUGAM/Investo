const mongoose = require("mongoose")

const CounterSchema = new mongoose.Schema(
    {
        id: {
            type: String,
        },
        count : {
            type: Number,
        }
    }
)
const Counter = mongoose.model("counter", CounterSchema);

module.exports = Counter