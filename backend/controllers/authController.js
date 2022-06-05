const db = require('../config/connectDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { user_email, user_password } = req.body;

    if (!user_email, !user_password)
        return res.status(400).json({ "message": "username and password are required" });
    try {
        const found = await db.query(
            'SELECT * FROM users WHERE user_email = $1',
            [user_email]
        );
        console.log(found);

        // if user does not exist
        if (found.rowCount === 0)
            return res.status(401).json({ "message": "User does not exist..." });

        const foundUser = found.rows[0];
        // match the password
        const match = await bcrypt.compare(user_password, foundUser.user_password);

        if (match) {
            // create JWT and save it in database
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        "userEmail": foundUser.user_email,
                        "userType": foundUser.user_type
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '900s' } // 15 min
            );

            const refreshToken = jwt.sign(
                { "userEmail": foundUser.user_email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            await db.query(
                'UPDATE users SET refresh_token = $1 WHERE user_email = $2',
                [refreshToken, user_email]
            );

            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            // sameSite: 'None', secure: true, 
            res.json({ "success": `User ${foundUser.user_name} is authorized`, accessToken });
        }

    } catch (err) {
        console.log(err.message);
        res.sendStatus(500);
    }

};

module.exports = { handleLogin };