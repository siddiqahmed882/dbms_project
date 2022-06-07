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

const getMyOrders = async (req, res) => {
  const { user_email } = req;
  try {
    // getting the userId from database
    const userId = (await db.query('SELECT user_id FROM users WHERE user_email = $1', [user_email])).rows[0].user_id;
    const result = await db.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
    const orders = result.rows;
    const response = {
      orders: orders.map((order) => ({
        orderId: order.order_id,
        totalPrice: order.order_total_price,
        shippingAddress: order.order_shipping_address,
        createdAt: order.order_date_time,
        isDelivered: order.order_status === 'delivered',
      })),
    };
    return res.json(response);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = (await db.query('SELECT * FROM orders WHERE order_id = $1', [id])).rows[0];

    // grab user and modify it for frontend
    let user = (await db.query('SELECT * FROM users WHERE user_id = $1', [order.user_id])).rows[0];
    user = {
      name: user.user_name,
      email: user.user_email,
      address: user.user_address,
    };

    const orderItems = await getOrderItems(id);

    return res.json({
      id: order.order_id,
      totalPrice: order.order_total_price,
      isDelivered: order.order_status === 'delivered',
      deliveredAt: order.order_delivered_at,
      createdAt: order.order_date_time,
      user,
      orderItems,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const getOrderItems = async (orderId) => {
  const result = (await db.query('SELECT * FROM order_item LEFT JOIN products using (product_id) WHERE order_id = $1', [orderId])).rows;
  const orderItems = result.map((item) => (
    {
      id: item.product_id,
      image: item.product_image,
      name: item.product_name,
      qty: item.order_item_qty,
      price: item.product_price,
    }
  ));
  return orderItems;
};



module.exports = { handleNewOrder, getMyOrders, getOrderById };