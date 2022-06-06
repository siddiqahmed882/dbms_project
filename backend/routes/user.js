const express = require('express');
const userProfileController = require('../controllers/userProfile');
const verifyJWT = require('../middleware/verifyJWT');
const verifyAdmin = require('../middleware/verifyAdmin');

const router = express.Router();

router.get('/', verifyJWT, userProfileController.getUserProfile);
router.put('/', verifyJWT, userProfileController.updateUserProfile);

router.get('/:id', verifyJWT, verifyAdmin, userProfileController.getUserProfileById);

module.exports = router;