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
            return res.status(200).json({ success: true, data: interviews });
        }else if(req.user.role==='tech'){
            axios.defaults.headers.common = {'Authorization': `Bearer ${req.user.token}`}
            const response=await axios.get(`http://localhost:5001/user`);
            const user=response.data.data;
            const interviews= await Interview.find({techId:user._id})
            return res.status(200).json({ success: true, data: interviews });
        }else{
            axios.defaults.headers.common = {'Authorization': `Bearer ${req.user.token}`}
            const response=await axios.get(`http://localhost:5001/user`);
            const user=response.data.data;
            const interviews= await Interview.find({hrId:user._id})
            res.status(200).json({ success: true, data: interviews });
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

const viewInterviewCandidatebyId = async (req, res ) => {
    try{
        if(req.user.role!=='admin')
            return res.status(401).json({success:false,data:"unauthorized access"});        
        const {id} = req.params;
        const interview = await Interview.findOne({_id: id})
        if (!interview) {
           return res.status(404).json({success:false,data:`No interview with Id ${id}`});
        } 
        axios.defaults.headers.common = {'Authorization': `Bearer ${req.user.token}`}
        const response=await axios.get(`http://localhost:5002/interview-management/candidate/${interview.candidateId}`);
        res.status(200).json({success: true, data: response?.data?.data})
    } catch (error){
        res.status(404).json({success:false,data:error});
    }
}

const candidatesToPanel =async (req, res) => {
    try{
        if(req.user.role==='tech'){
            axios.defaults.headers.common = {'Authorization': `Bearer ${req.user.token}`}
            const response=await axios.get(`http://localhost:5001/user`);
            const user=response.data.data;
            const interviewsAssigned= await Interview.find({techId:user._id})
            const CandidateId = interviewsAssigned.map((interview) => interview.candidateId)
            const data=[];
            for(let id of CandidateId){
                const response=await axios.get(`http://localhost:5002/interview-management/candidate/${id}`);
                const candidate=response.data.data;
                data.push(candidate); 
            }
            res.status(200).json({success: true, data})
        }else if(req.user.role==='hr'){
            axios.defaults.headers.common = {'Authorization': `Bearer ${req.user.token}`}
            const response=await axios.get(`http://localhost:5001/user`);
            const user=response.data.data;
            const interviewsAssigned= await Interview.find({hrId:user._id})
            const CandidateId = interviewsAssigned.map((interview) => interview.candidateId)
            const data=[];
            for(let id of CandidateId){
                const response=await axios.get(`http://localhost:5002/interview-management/candidate/${id}`);
                const candidate=response.data.data;
                data.push(candidate); 
            }
            res.status(200).json({success: true, data})
        }else{
            return res.status(401).json({success:false,data:"unauthorized access"});        
        } 
    }catch(error) {
        res.status(404).json({success:false,data:error})
    }    
} 

module.exports = {
    viewInterviewCandidatebyId,
    candidatesToPanel,
    schdeduleInterview,
    updateInterview,
    getAllInterviews
}
