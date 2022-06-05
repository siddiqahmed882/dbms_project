const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// verify jwt for protected routes
router.use(verifyJWT);
router.post('/', productController.createProduct);

module.exports = router;