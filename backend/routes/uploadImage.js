const express = require('express');
const imageUploadController = require('../controllers/imageUploadController');

const router = express.Router();

router.post('/', imageUploadController.handleImageUpload);

module.exports = router;