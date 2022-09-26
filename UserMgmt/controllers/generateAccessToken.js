const jwt=require('jsonwebtoken');
const User=require('../models/userSchema');

const refresh = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
    const refreshToken = cookies.jwt
    console.log(cookies);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            try {
                const foundUser = await User.findOne({ userName: decoded.userName })
                if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })
                const accessToken = jwt.sign(
                    {
                        "userName": foundUser.userName,
                        "role": foundUser.role
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1h' }
                )
                res.status(200).json({ accessToken })
            } catch (err) {
                console.log(err.message);
                res.status(400).json({success:false,data:err.message});
            }
        }
    )
}

module.exports=refresh;