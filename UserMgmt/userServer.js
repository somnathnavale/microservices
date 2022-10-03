require('dotenv').config()
const express = require("express");
const mongoose=require('mongoose');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const connectDB=require('./db/connect');

const app = express();
connectDB(process.env.MONGO_URI);

//allowing access from different origin 
app.use(cors({origin:'http://localhost:3000',credentials:true}));

//middlewares
//parsing the data 
app.use(express.json());
app.use(cookieParser());

//routes
//users routes 
app.use('/user',require('./routes/userRoutes'));

mongoose.connection.once('open',()=>{
    app.listen(process.env.PORT,console.log("Listening..."));
})

module.exports = app
