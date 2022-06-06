const db = require('../config/connectDB');

const handleNewOrder = async (req, res) => {
  // checking who post the order
  const { user_email } = req;
  try {
    // getting the userId from database
    const result = await db.query('SELECT user_id FROM users WHERE user_email = $1', [user_email]);
    const userId = Number(result.rows[0].user_id);

    // getting total price
    const totalPrice = Number(req.body.totalPrice);

    // get Shipping address
    const { address } = req.body.shippingAddress;

    // create new order in database
    const result2 = await db.query(
      'INSERT INTO orders (user_id, order_total_price, order_shipping_address) VALUES ($1, $2, $3) RETURNING *',
      [userId, totalPrice, address],
    );
    const orderId = Number(result2.rows[0].order_id);

    // for each item create new order_detail in database
    const orderItems = req.body.orderItems;

    for (const orderItem of orderItems) {
      const productId = Number(orderItem.product);
      const quantity = Number(orderItem.qty);
      console.log(orderId, productId, quantity);
      const res = await db.query(
        'INSERT INTO order_item (order_id, product_id, order_item_qty) VALUES ($1, $2, $3) RETURNING *',
        [orderId, productId, quantity],
      );
      console.log(res.rows[0]);
    }

    // return the orderId
    return res.json({ orderId });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM orders WHERE order_id = $1', [id]);
    const order = result.rows[0];
    return res.json({
      id: order.order_id,
      userId: order.user_id,
      totalPrice: order.order_total_price,
      orderItems: await getOrderItems(order.order_id),

    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const getOrderItems = async (orderId) => {
  const result = await db.query('SELECT * FROM order_details WHERE order_id = $1', [orderId]);
  const orderItems = result.rows;
  return orderItems;
};



module.exports = { handleNewOrder };