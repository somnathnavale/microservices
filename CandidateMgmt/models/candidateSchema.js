const mongoose=require('mongoose');

const candidateSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name field is required']
    },
    primarySkills:[{
        type:String,
        required:[true,'primary skills field is required'] 
    }],
    secondarySkills:[{
        type:String,
        required:[true,'secondary Skills field is required']
    }],
    experience:{
        type:Number,
        required:[true,'experience field is required']
    },
    qualification:{
        type:String,
        required:[true,'qualification field is required']
    },
    designation:{
        type:String,
        required:[true,'designation field is required']
    },
    noticePeriodInWeeks:{
        type:Number,
        required:[true,'notice period field is required']
    },
    location:{
        type:String,
        required:[true,'location field is required']
    }
})

const Candidate=mongoose.model('candidate',candidateSchema);

module.exports=Candidate;