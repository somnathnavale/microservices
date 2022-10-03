const express=require('express');
const verifyJWT=require('../middlewares/verifyJWT');

const {schdeduleInterview, updateInterview,getAllInterviews} = require('../controllers/interviewController')

const router=express.Router();

router.route('/').get(verifyJWT,getAllInterviews);
router.route('/').post(verifyJWT,schdeduleInterview);
router.route('/:id').put(verifyJWT,updateInterview);

module.exports= router;
