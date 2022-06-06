const db = require('../config/connectDB');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../util/generateTokens');


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const handleNewUser = async (req, res) => {
  const { user_name, user_email, user_password, user_tel, user_address, user_avatar } = req.body;

  // check for all fields
  if (!user_name, !user_email, !user_tel, !user_address, !user_password, !user_avatar)
    return res.status(400).json({ "message": "All fields are required" });

  // sending data to backend
  try {
    const hashedPwd = await bcrypt.hash(user_password, 10);
    const result = await db.query(
      'INSERT INTO users (user_name, user_email, user_password, user_tel, user_address, user_avatar) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      [user_name, user_email, hashedPwd, user_tel, user_address, user_avatar]
    );

    const accessToken = generateAccessToken(result.rows[0].user_email, result.rows[0].user_type);

    const refreshToken = generateRefreshToken(result.rows[0].user_email);

    await db.query(
      'UPDATE users SET refresh_token = $1 WHERE user_email = $2',
      [refreshToken, user_email]
    );

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });

    return res.status(201).json({
      id: result.rows[0].user_id,
      name: result.rows[0].user_name,
      email: result.rows[0].user_email,
      isAdmin: result.rows[0].user_type === 'admin' ? true : false,
      avatar: result.rows[0].user_avatar,
      address: result.rows[0].user_address,
      token: accessToken
    });

  } catch (err) {
    if (err.message.includes('violates check constraint "users_user_tel_check"'))
      return res.status(400).json({ "message": "Telephone Number must be of exactly 11 characters" });
    if (err.message.includes("violates unique constraint \"users_user_email_key\""))
      return res.status(400).json({ message: "The email is already taken...." });
    return res.status(500).json({ "message": err.message });
  }

};

module.exports = { handleNewUser };