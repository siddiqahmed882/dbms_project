const db = require('../config/connectDB');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../util/generateTokens');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const handleLogin = async (req, res) => {
    const { user_email, user_password } = req.body;

    if (!user_email || !user_password)
        return res.status(400).json({ "message": "username and password are required" });
    const found = await db.query(
        'SELECT * FROM users WHERE user_email = $1',
        [user_email]
    );

    // if user does not exist
    if (found.rowCount === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const foundUser = found.rows[0];
    // match the password
    const match = await bcrypt.compare(user_password, foundUser.user_password);

    if (match) {
        // create JWT and save it in database
        const accessToken = generateAccessToken(foundUser.user_email, foundUser.user_type);

        const refreshToken = generateRefreshToken(foundUser.user_email);

        await db.query(
            'UPDATE users SET refresh_token = $1 WHERE user_email = $2',
            [refreshToken, user_email]
        );

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });

        res.json({
            id: foundUser.user_id,
            name: foundUser.user_name,
            email: foundUser.user_email,
            isAdmin: foundUser.user_type === 'admin' ? true : false,
            address: foundUser.user_address,
            token: accessToken,
        });
    } else {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

};

module.exports = { handleLogin };