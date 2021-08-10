const mongoose = require('mongoose')

// connect to Database
const connectDB = async() => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useCreateIndex: true
          })
        console.log('MongoDB connecting on : ' + con.connection.host);
    }catch(err){
        console.log(err);
        process.exit(1)
    
    }  
}

module.exports = connectDB