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


module.exports = {
    addCandidate,
    viewCandidate,
    getAllCandidate
}

//use below format for every response

// res.status(statusCode).json({sucess:true/false,data:data})
//statusCode- go through http status code
//200- for successfully reading, updating, deleted
//201- for successfully creating
//401- unauthorised access
//403- forbidden access
//500- internal server error
//404- resource not found
//400- bad request