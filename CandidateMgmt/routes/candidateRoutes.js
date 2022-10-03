const express=require('express');
const verifyJWT=require('../middlewares/verifyJWT');

const {addCandidate,viewCandidate, getAllCandidate,editCandidate}=require('../controllers/candidateController');

const router=express.Router();

router.route('/').get(verifyJWT,getAllCandidate);
router.route('/').post(verifyJWT,addCandidate);
router.route('/:id').get(verifyJWT,viewCandidate)
router.route('/:id').put(verifyJWT,editCandidate)

module.exports=router;