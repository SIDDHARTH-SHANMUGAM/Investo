const mongoose = require('mongoose')

const connectDb = async () =>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('db connected')
    })
    .catch((e)=>{
        console.log('error occured in db connection '+e)
    })
}

module.exports = connectDb;