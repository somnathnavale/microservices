const express=require('express');
const { login,logOut,registerPanel, getUser } = require('../controllers/userController');
const verifyJWT=require('../middlewares/verifyJWT');

const router=express.Router();

router.route('/')
    .get(verifyJWT,getUser)
    .post(verifyJWT,registerPanel)

router.route('/login').post(login);
router.route('/logout').get(verifyJWT,logOut);

module.exports=router;
