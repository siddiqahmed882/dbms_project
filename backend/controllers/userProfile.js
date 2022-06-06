const db = require('../config/connectDB');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../util/generateTokens');

const getUserProfile = async (req, res) => {
  const { user_email } = req;
  const result = await db.query('SELECT * FROM users WHERE user_email = $1', [user_email]);
  const user = result.rows[0];
  console.log(user);
  return res.json({
    id: user.user_id,
    name: user.user_name,
    email: user.user_email,
    isAdmin: user.user_type === 'admin' ? true : false,
    tel: user.user_tel,
    address: user.user_address,
    avatar: user.user_avatar,
  });
};

const updateUserProfile = async (req, res) => {
  const { user_email } = req;
  const { user_name, user_password, user_address, user_tel } = req.body;
  const hashedPwd = await bcrypt.hash(user_password, 10);
  const result = await db.query(
    'UPDATE users SET user_name = $1, user_password = $2, user_tel = $3, user_address = $4 WHERE user_email = $5  RETURNING *',
    [user_name, hashedPwd, user_tel, user_address, user_email]
  );
  return res.json({
    id: result.rows[0].user_id,
    name: result.rows[0].user_name,
    email: result.rows[0].user_email,
    isAdmin: result.rows[0].user_type === 'admin' ? true : false,
    address: result.rows[0].user_address,
    token: generateAccessToken(result.rows[0].user_email, result.rows[0].user_type),
  });
};

const getUserProfileById = async (req, res) => {
  const { id } = req.params;
  const result = await db.query('SELECT * FROM users WHERE user_id = $1', [id]);
  const user = result.rows[0];
  return res.json({
    id: user.user_id,
    name: user.user_name,
    email: user.user_email,
    isAdmin: user.user_type === 'admin' ? true : false,
  });
};


module.exports = { getUserProfile, updateUserProfile, getUserProfileById };
