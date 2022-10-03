const User=require('../models/userSchema')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt')

const listAllPanelMember=async(req,res)=>{
    if(req.user.role!=="admin")
        return(res.status(401).json({success:false,data:"Unauthorize Access"}));
    try{
       const panelMembers=await User.find({role:{$ne:'admin'}});
       res.status(200).json({success:true,data:panelMembers});
    }
    catch(err){
        res.status(400).json({success:false,data:err.message});
    }
}

const searchEmployee=async(req,res)=>{
    if(req.user.role!=="admin")
        return(res.status(401).json({success:false,data:"Unauthorized Access"}));
    try{
        const {name,skill}=req.query;
        const queryObj={};
        if(name){
            queryObj.userName=name;
        }
        if(skill){
            queryObj.skills=skill;
        }
        const employees=await User.find(queryObj);
        if(!employees){
            res.status(404).json({success:false,data:"No employee present with given details"});
        }
        res.status(200).json({success:true,data:employees});
    }
    catch(err){
        res.status(400).json({success:false,data:err.message})
    }
}


const registerPanel=async(req, res) => {
	try {
        if(req?.user?.role!=='admin')
            return res.status(401).json({success:false,data:"unathorised access"})
        const user = await User.findOne({userName:req?.body?.userName})
        if(user)
            return res.status(209).json({success:false,data:"Given username is already registered"})
        const newUser=new User(req.body);
       
        const salt=await bcrypt.genSalt(10);
        newUser.password=await bcrypt.hash(newUser.password, salt);

        await newUser.save();
        res.status(201).json({success:true,data:newUser});
	} catch (err) {
		res.status(400).json({success:false,data:err.message})
	}
}

const getUser = async(req,res)=>{
    try{
        const user = await User.findOne({userName:req.user.userName})
        res.status(200).json({success:true,data:user})
    }catch(err){
        res.status(400).json({success:false,data:err.message})
    }
}

const deletePanel = async(req,res)=>{
    try{
        if(req.user.role==='admin'){
            const { id: userid } = req.params
            const dUser = await User.findOneAndDelete({ _id: userid  })
            if (!dUser) {
                return res.status(400).json({success:false,data:"no user with the given id"})
            } 
            res.status(200).json({success:true,data:dUser })
        }else{
            const result = await User.deleteOne({userName : req.user.userName});
            if(!result){
                return res.status(400).json({success:false,data:"User with given credentials not found"})
            } 
            res.status(200).json({ success: true, data: result });
        }   
    }catch(err){
        res.status(400).json({success:false,data:err.message})
    }
}

const login=async(req,res)=>{
    const {userName,password}=req.body;
    if(!userName || !password)
        return res.status(400).json({success:false,data:"please provide both the fields"});
    try{
        const user=await User.findOne({userName});
        if(!user)
            return res.status(400).json({success:false,data:"no user found with given credentials"});
        const match=await bcrypt.compare(password,user.password);
        if(!match)
            return res.status(400).json({success:false,data:"please provide valid credentials"});
        const accessToken=jwt.sign(
            {
                "userName":userName,
                role:user.role 
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'1h'}
        );
        const refreshToken=jwt.sign(
            {"userName":userName},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:"1d"}
        );
        // Create secure cookie with refresh token 
        res.cookie('jwt', refreshToken, {
            httpOnly: true, //accessible only by web server 
            secure: true, //https
            sameSite: 'None', //cross-site cookie 
            maxAge: 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        })
        res.status(200).json({success:true,role:user.role,accessToken});
    }catch(err){
        console.log(err.message);
        res.status(400).json({success:false,data:err.message});
    }
}

const logOut=async(req,res)=>{
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ sucess:true,message: 'Cookie cleared' })
}


const editPanelMeber=async (req,res)=>{
    if(req.user.role!=="admin")
        return(res.status(401).json({success:false,data:"Unauthorize Access"}));
    const updates = Object.keys(req.body);
    try {
        const user = await User.findOne({
            _id: req.params.id,
        });
        if(!user) {
            return res.status(404).json({
                success:false,
                data:"No panel With given id"
            });
        }
        updates.forEach((update) => user[update] = req.body[update]);
        const updatedUser=await user.save();
        res.status(200).json({success:true,user:updatedUser});
    } catch (e) {
        res.status(400).json({success:false,data:e.message});
    }
}


module.exports = {
    registerPanel,
    getUser,
    deletePanel,
    login,
    logOut,
    listAllPanelMember,
    searchEmployee,
    editPanelMeber
}
