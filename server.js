const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const $ = require( "jquery" );

const connectDB = require('./server/database/connection')

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT||8080

//log requests
app.use(morgan('tiny'));

//connect mongoDB
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))
app.use('/jquery',express.static(path.join(__dirname+'/node_modules/jquery/dist/'))); 
//set view engine
app.set("view engine","ejs")
//app.set("views",path.resolve(__dirname,"views/ejs"))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use('/File',express.static(path.resolve(__dirname,"File_Collect")))

//Load router
app.use('/',require('./server/routes/router'))
app.use('/result',require('./server/routes/router'))
app.use('/create',require('./server/routes/router'))
app.use('/doc_description',require('./server/routes/router'))
app.use('/update_document',require('./server/routes/router'))
app.use('/management',require('./server/routes/router'))

app.listen(3000,()=> {console.log('Server is running on http://localhost:'+ PORT)});