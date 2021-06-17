const mongoose = require('mongoose');
const express = require('express');
const app = express();

//DB connection
const DB = 'mongodb+srv://goutams:hasstag@cluster0.rchwk.mongodb.net/mernstack?retryWrites=true&w=majority'

mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() => {
    console.log(`Connection Successful`);
}).catch((err) => console.log(`not connected`,err));

//Middleware

const middleware = (req,res,next) => {
    console.log(`Hello Middleware`);
    //here we define all the authentication related codes & functions
    next();//this will run your next action - redirect to path
}

app.get('/', (req, res) => {
    res.send(`Hello world from the server`);
})
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
    console.log(`Server is running on 3000`)
})