const express=require('express');

const router=express.Router();

router.route('/').get(require('../controllers/generateAccessToken'));

module.exports=router;

