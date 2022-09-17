const mongoose=require('mongoose');

const interviewSchema=new mongoose.Schema({
    candidateId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Candidate',
        required:[true,'candidate id is required']
    },
    techId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    hrId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    techRating:{
        type:Number,
    },
    hrRating:{
        type:Number,
    },
    techComments:{
        type:String,
    },
    hrComments:{
        type:String,
    },
    status:{
        type:String,
        required:[true,'interview status is required'],
        default:"new",
        enum:['new','tech_shortlisted','selected','cancelled'] 
    },
    startTime:{
        type:String,
        required:[true,'interview start time is required'] 
    }
})

const Interview=mongoose.model('interview',interviewSchema);

module.exports=Interview;