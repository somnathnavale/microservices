const express=require('express');
const verifyJWT=require('../middlewares/verifyJWT');

const {viewInterviewCandidatebyId, candidatesToPanel, schdeduleInterview, updateInterview,getAllInterviews} = require('../controllers/interviewController')

const router=express.Router();

router.route('/interview').get(verifyJWT,getAllInterviews);
router.route('/interview').post(verifyJWT,schdeduleInterview);
router.route('/interview/candidate').get(verifyJWT,candidatesToPanel);
router.route('/interview/:id').put(verifyJWT,updateInterview);
router.route('/interview/:id/candidate').get(verifyJWT ,viewInterviewCandidatebyId)

module.exports= router;
