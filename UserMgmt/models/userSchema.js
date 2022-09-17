const mongoose=require('mongoose');
const {isEmail}=require('validator');

//firstname, lastname, userName, password, type,phone
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'firstName is required'] 
    },
    lastName:{
        type:String,
        required:[true,'lastName is required']  
    },
    userName:{
        type:String,
        required:[true,'userName is required']   
    },
    password:{
        type:String, 
        required:[true,'password is required']   
    },
    email: { 
        type:String,
        required:[true,'email is required'] ,
        validate: [ isEmail, 'invalid email' ]
    },
    phone:{
        type:Number,
        minLength:10,
        maxLength:10,
        required:[true,'phone number is required'] 
    },
    role: {
        type: String,
        enum: ["admin", "tech", "hr"],
        required:[true,'role is required'] 
    },
    skills:[{
        type:String,
    }],
    location:{
        type:String,
    },
    experience:{
        type:Number,
    }
})


const User=mongoose.model('user',userSchema);

module.exports=User;