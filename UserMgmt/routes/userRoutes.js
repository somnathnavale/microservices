const express=require('express');
const { login,logOut,registerPanel, getUser, deletePanel, listAllPanelMember, editPanelMeber, searchEmployee } = require('../controllers/userController');
const refresh=require('../controllers/generateAccessToken')
const verifyJWT=require('../middlewares/verifyJWT');

const router=express.Router();

router.route('/')
    .get(verifyJWT,getUser)
    .post(verifyJWT,registerPanel)

router.route('/login').post(login);
router.route('/logout').get(verifyJWT,logOut);

router.route('/token').get(refresh);

router.route('/member').get(verifyJWT,listAllPanelMember)

router.route('/member/:id')
    .delete(verifyJWT,deletePanel)
    .put(verifyJWT,editPanelMeber);

router.route('/search').get(verifyJWT,searchEmployee)

module.exports=router;
