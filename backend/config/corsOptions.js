const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (reqOrigin, callback) => {
        if (allowedOrigins.includes(reqOrigin) || !reqOrigin) {
            callback(null, true);
        } else {
            callback(new Error('Not Allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

module.exports = corsOptions;