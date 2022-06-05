const db = require('../config/connectDB');
const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) => {
  const { user_name, user_email, user_password, user_tel, user_address } = req.body;

  // check for all fields
  if (!user_name, !user_email, !user_tel, !user_address, !user_password)
    return res.status(400).json({ "message": "All fields are required" });

  // avatar is yet to handle

  // sending data to backend
  try {
    const hashedPwd = await bcrypt.hash(user_password, 10);
    const result = await db.query(
      'INSERT INTO users (user_name, user_email, user_password, user_tel, user_address) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [user_name, user_email, hashedPwd, user_tel, user_address]
    );
    res.status(201).json(`success: New user ${user_name} created!`);
  } catch (err) {
    console.log(err);
    // needs to be changed
    if (err.message.includes('violates check constraint "users_tel_check"'))
      res.status(500).json({ "message": "Telephone Number must be of exactly 11 characters" });
    if (err.message.includes("violates unique constraint \"users_email_key\""))
      res.json({ message: "The email is already taken...." });
    res.status(500).json({ "message": err.message });
  }

};

module.exports = { handleNewUser };