const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'});
// DB connection here
require('./db/conn.js');
app.use(express.json());
//Router linked here
app.use(require('./router/auth'));



const PORT  = process.env.PORT;


//Middleware

const middleware = (req,res,next) => {
    console.log(`Hello Middleware`);
    //here we define all the authentication related codes & functions
    next();//this will run your next action - redirect to path
}

// app.get('/', (req, res) => {
//     res.send(`Hello world from the server`);
// })
app.get('/about', middleware, (req, res) => {
    res.send(`What About from the server`);
})
app.get('/contact', (req, res) => {
    res.send(`Now you can contact  the server`);
})
app.get('/signup', (req, res) => {
    res.send(`Lets signup to the server`);
})
app.get('/login', (req, res) => {
    res.send(`login to the server`);
})

app.listen(3000, () => {
    console.log(`Server is running on ${PORT}`)
})