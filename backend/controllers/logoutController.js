const db = require('../config/connectDB');

const handleLogout = async (req, res) => {
  // on client, also delete the access token

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content to send

  const refreshToken = cookies.jwt;
  try {
    const found = await db.query(
      'SELECT * FROM users WHERE refresh_token = $1',
      [refreshToken]
    );

    // if not found
    if (found.rowCount === 0) {
      res.clearCookie('jwt', { httpOnly: true });
      //sameSite: 'None', secure: true 
      return res.sendStatus(204); // No content to send
    }

    const foundUser = found.rows[0];

    // Delete the refreshToken in database
    await db.query(
      'UPDATE users SET refresh_token = $1 WHERE user_id = $2',
      [null, foundUser.user_id]
    );

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    return res.sendStatus(204); // No content to send

  } catch (err) {
    return res.sendStatus(500);
  }
};


module.exports = { handleLogout };