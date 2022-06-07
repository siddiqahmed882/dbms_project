const express = require('express');
const ordersController = require('../controllers/ordersController');
const verifyJWT = require('../middleware/verifyJWT');

const router = express.Router();

router.post('/', verifyJWT, ordersController.handleNewOrder);
router.get('/myorders', verifyJWT, ordersController.getMyOrders);
router.get('/:id', verifyJWT, ordersController.getOrderById);

module.exports = router;