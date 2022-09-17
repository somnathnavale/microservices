const mongoose=require('mongoose');

const shareProfileSchema =new mongoose.Schema({
    candidateId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Candidate',
        required:[true,'candidate id is required']
    },
    interviewId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Interview',
        required:[true,'interview  id is required']
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'candidate id is required']
    }
})

const shareProfile=mongoose.model('shareProfile',shareProfileSchema);

module.exports= shareProfile;