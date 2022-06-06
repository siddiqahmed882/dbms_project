require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credientials');
const verifyJWT = require('./middleware/verifyJWT');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 3500;

const app = express();

// handle options credentials check before CORS and fetch cookies credential requirements
app.use(credentials);

// corss origin resource sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data; in other words form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

app.use(fileUpload());

// serve static file
app.use('/', express.static(path.join(__dirname, 'public')));

// public routes
app.use('/api/products', require('./routes/products'));

// user register and auth
app.use('/api/register', require('./routes/register'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/refresh', require('./routes/refresh'));
app.use('/api/logout', require('./routes/logout'));
app.use('/api/user', require('./routes/user'));

// upload file
app.use('/api/uploadImage', require('./routes/uploadImage'));

// order routes
app.use('/api/orders', require('./routes/orders'));



app.listen(PORT, () => console.log(`Server started at port ${PORT}`));