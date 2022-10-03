const express=require('express');
const verifyJWT=require('../middlewares/verifyJWT');
const {addCandidate,viewCandidate, getAllCandidate,editCandidate}=require('../controllers/candidateController');

const router=express.Router();

router.route('/candidate').post(verifyJWT,addCandidate);
router.route('/candidate').get(verifyJWT,getAllCandidate);
router.route('/candidate/:id').get(verifyJWT,viewCandidate)
router.route('/candidate/edit/:id').put(verifyJWT,editCandidate)

module.exports=router;