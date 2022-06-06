const db = require('../config/connectDB');

const getAllProducts = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM products'
    );
    const products = result.rows;
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      'SELECT * FROM products WHERE product_id = $1',
      [id]
    );
    const { rowCount, rows } = result;
    return res.json(rows[0]);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {

};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct
};