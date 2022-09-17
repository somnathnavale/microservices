const shareProfile = require('../models/shareProfileSchema');

const profile = async (req, res) => {
    try {
        const newProfile = new shareProfile(req.body);
        await newProfile.save();
        res.status(201).json({ success: true, data: newProfile })
    }
    catch (error) {
        res.status(500).json({ success:false, data: error.message })
    }
}

module.exports ={profile}