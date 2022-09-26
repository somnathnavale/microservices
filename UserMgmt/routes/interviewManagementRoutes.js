const express=require('express');
const verifyJWT=require('../middlewares/verifyJWT');

const {listAllPanelMember, searchEmployee,deletePanel,editPanelMeber}= require("../controllers/userController")

const router=express.Router();

router.route('/panel/member').get(verifyJWT,listAllPanelMember);
router.route('/panel/member/:id').delete(verifyJWT,deletePanel);
router.route('/panel/member/:id').put(verifyJWT,editPanelMeber);
//use above route for surrender as panel member  logic is written in controller

router.route('/employee/search').get(verifyJWT,searchEmployee);


module.exports= router;
