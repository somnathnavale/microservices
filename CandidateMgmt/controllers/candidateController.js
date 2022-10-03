const Candidate=require('../models/candidateSchema');

const addCandidate=async(req,res)=>{
    if(req.user.role!=="admin")
        return(res.status(401).json({success:false,data:"Unauthorized Access"}));
    try{
        const candidate=new Candidate(req.body);
        await candidate.save();
        res.status(201).json({success:true,data:candidate});
    }
    catch(e){
        res.status(400).json({success:false,data:e.message});
    }
}

const viewCandidate=async(req,res)=>{
    try{
        const candidate=await Candidate.findById(req.params.id);
        if(!candidate){
            return(res.status(404).json({success:false,data:"Candidate Not Found"}));
        }
        res.status(200).json({success:true,data:candidate});
    }
    catch(e){
        res.status(400).json({success:false,data:e.message});
    }
}

const getAllCandidate = async (req, res) => {
    if(req.user.role!=="admin")
        return(res.status(401).json({success:false,data:"Unauthorized Access"}));
    try {
        const candidates = await Candidate.find({})
        res.status(200).json({ success: true, data: candidates })
    }
    catch (error) {
        res.status(400).json({ success:false,data: error.message })
    }
}

const editCandidate=async (req,res)=>{
    if(req.user.role!=="admin"){
        return(res.status(401).json({success:false,data:"Unauthorize Access"}));}
    const updates = Object.keys(req.body);
    try {
        const candidate = await Candidate.findOne({_id: req.params.id});
        if(!candidate) {
            return res.status(404).json({
                success:false,
                data:"No panel With given id"
            });
        }
        updates.forEach((update) => candidate[update] = req.body[update]);
        const updatedCandidate=await candidate.save();
        res.status(200).json({success:true,candidate:updatedCandidate});
    } catch (e) {
        res.status(400).json({success:false,data:e.message});
    }
}

module.exports = {
    addCandidate,
    viewCandidate,
    getAllCandidate,
    editCandidate
}
