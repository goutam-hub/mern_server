const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
// var cookieParser = require('cookie-parser');

const app = express();
// app.use(cookieParser())


dotenv.config({path:'./config.env'});
// DB connection here
require('./db/conn.js');
app.use(express.json());
//Router linked here
app.use(require('./router/auth'));


const PORT  = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})