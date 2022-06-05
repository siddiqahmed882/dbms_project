const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../config/connectDB');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);

  if (!cookies?.jwt) return res.sendStatus(401); // unauthorized

  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  try {
    const found = await db.query(
      'SELECT * FROM users WHERE refresh_token = $1',
      [refreshToken]
    );

    console.log(found);

    // if user does not exist
    if (found.rowCount === 0)
      return res.sendStatus(403); // forbidden

    const foundUser = found.rows[0];

    // evaluate jwt

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.user_email !== decoded.userEmail) res.sendStatus(403); // forbidden
        const accessToken = jwt.sign(
          {
            UserInfo: {
              "userEmail": foundUser.user_email,
              "userType": foundUser.userType
            }
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '900s' } // 15 min
        );
        res.json({ "success": `User ${foundUser.user_name} is authorized`, accessToken });
      });
  } catch (err) {

  }

};


module.exports = { handleRefreshToken };