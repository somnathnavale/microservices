require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const User=require('./models/userSchema');
const bcrypt=require('bcrypt');

const createAdmin=async(req,res)=>{
    const admin1={
        firstName:"Somnath",
        lastName:"Navale",
        email:"somnathnavale@gmail.com",
        password:"somnathnavale123",
        userName:"sammy",
        role:"admin",
        phone:7039991466  
    }
    try{
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        admin1.password = await bcrypt.hash(admin1.password, salt);
        const newAdmin=new User(admin1);
        newAdmin.save();
    }catch(err){
        console.log('err',err);
    }
}

const app=express();
const PORT=process.env.PORT || 5001;
const MONGO_URI=process.env.MONGO_URI;


mongoose.connect(MONGO_URI,{}).then(()=>{
    console.log('connected to DB');
    app.listen(PORT,()=>{
        console.log('listening...');
    })
    createAdmin();
})