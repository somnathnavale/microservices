const Interview =require('../models/interviewSchema')
const axios=require('axios');

const schdeduleInterview = async (req, res) => {
    if(req.user.role!=='admin'){
        return res.status(401).json({success:false,data:"unauthorised access"})
    }
    try {
        const interview=new Interview(req.body);
        await interview.save();
        res.status(201).json({ success: true, data: interview });
    }
    catch (error) {
        res.status(400).json({ success:false,data:error.message })
    }
}

const getAllInterviews=async(req,res)=>{
    try {
        if(req.user.role==='admin'){
            const interviews=await Interview.find({});
            const updatedInterview=[];
            axios.defaults.headers.common = {'Authorization': `Bearer ${req.user.token}`}
            for(let interview of interviews){
                const response=await axios.get(`http://localhost:5002/candidate/${interview.candidateId}`);
                const candidate=response.data.data;
                updatedInterview.push({...interview._doc,name:candidate.name});
            }
            return res.status(200).json({ success: true, data: updatedInterview });
        }else if(req.user.role==='tech'){
            axios.defaults.headers.common = {'Authorization': `Bearer ${req.user.token}`}
            const response=await axios.get(`http://localhost:5001/user`);
            const user=response.data.data;
            const interviews= await Interview.find({techId:user._id})

            const updatedInterview=[];
            axios.defaults.headers.common = {'Authorization': `Bearer ${req.user.token}`}
            for(let interview of interviews){
                const response=await axios.get(`http://localhost:5002/candidate/${interview.candidateId}`);
                const candidate=response.data.data;
                updatedInterview.push({...interview._doc,name:candidate.name});
            }
            return res.status(200).json({ success: true, data: updatedInterview });
            // return res.status(200).json({ success: true, data: interviews });
        }else{
            axios.defaults.headers.common = {'Authorization': `Bearer ${req.user.token}`}
            const response=await axios.get(`http://localhost:5001/user`);
            const user=response.data.data;
            const interviews= await Interview.find({hrId:user._id})

            const updatedInterview=[];
            axios.defaults.headers.common = {'Authorization': `Bearer ${req.user.token}`}
            for(let interview of interviews){
                const response=await axios.get(`http://localhost:5002/candidate/${interview.candidateId}`);
                const candidate=response.data.data;
                updatedInterview.push({...interview._doc,name:candidate.name});
            }
            return res.status(200).json({ success: true, data: updatedInterview });
            // res.status(200).json({ success: true, data: interviews });
        }
    }
    catch (error) {
        res.status(400).json({ success:false,data:error.message })
    }
}

const updateInterview = async(req, res)=>{
    try{
        if(req.user.role==='tech'){
            const {techRating,techComments}=req.body;
            const interview= await Interview.findOneAndUpdate({_id: req.params.id},{techRating,techComments}, {new: true, runValidators: true,})
            if (!interview)
                return res.status(404).json({success:false ,data: `No interview with id :${req.params.id}` })
            res.status(200).json({success:true,data:interview});
        }else if(req.user.role==='hr'){
            const {hrRating,hrComments}=req.body;
            const interview= await Interview.findOneAndUpdate({_id: req.params.id},{hrRating,hrComments}, {new: true, runValidators: true,})
            if (!interview)
                return res.status(404).json({success:false ,data: `No interview with id :${req.params.id}` })
            res.status(200).json({success:true,data:interview});        
        }else if(req.user.role==='admin'){
            const {candidateId,hrId,techId,status,startTime}=req.body;
            const interview = await Interview.findOneAndUpdate({ _id: req.params.id },{candidateId,hrId,techId,status,startTime}, {new: true, runValidators: true,})
            if (!interview)
                return res.status(404).json({success:false ,data: `No interview with id :${req.params.id}` })
            res.status(200).json({ success: true, data: interview })
        }
    }catch(error){
        res.status(400).json({success:false,data:error.message})
    }
}

module.exports = {
    schdeduleInterview,
    updateInterview,
    getAllInterviews
}
