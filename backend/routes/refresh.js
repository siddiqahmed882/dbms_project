const express = require('express');
const refreshToken = require('../controllers/refreshTokenController');

const router = express.Router();

router.get('/', refreshToken.handleRefreshToken);

module.exports = router;