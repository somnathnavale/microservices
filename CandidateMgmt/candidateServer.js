require('dotenv').config()
const express = require("express");
const mongoose=require('mongoose');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const connectDB=require('./db/connect');

const app = express();
connectDB(process.env.MONGO_URI);

//middlewares
//parsing the data 
app.use(express.json());
app.use(cookieParser());
//allowing access from different origin 
app.use(cors({origin:'http://localhost:3000',credentials:true}));

//routes

//interview mgmt routes
app.use('/interview-management',require('./routes/candidateRoutes'))

mongoose.connection.once('open',()=>{
    app.listen(process.env.PORT,console.log("Listening..."));
})

module.exports = app
