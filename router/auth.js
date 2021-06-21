const express=require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('../db/conn');
const User = require('../model/userSchema');


router.get('/', (req, res) => {
    res.send(`Hello world from the server router.js`);
})

// Data create through Promise
// router.post('/register',(req, res) => {
//     const {name, email, phone, work, password, cpassword} = req.body;
//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error:'Please fill the data'});
//     }

//     User.findOne({email : email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:'Email already exists !'});
//         }

//         const user = new User({name, email, phone, work, password, cpassword});

//         user.save().then(() => {
//             res.status(201).json({messageL:'User registered successfully'});
//         }).catch(err => {console.log(err)})
//     })
// })


//Data create through async await
router.post('/register', async (req, res) => {
    const {name, email, phone, work, password, cpassword} = req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:'Please fill the data'});
    }

    try{
        const userExist = await User.findOne({email:email});
        if(userExist){
            return res.status(422).json({error:'User already exists !'});
        }else if(password != cpassword){
            return res.status(422).json({error:'Password not matched !'});
        }else{
            const user = new User({name, email, phone, work, password, cpassword});
            await user.save();

            res.status(201).json({message:'User registered successfully'})
        }

        
    }catch(err){
        console.log(err)
    }
})

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(422).json({errpr : 'Please fill the data'});
        }

        const user = await User.findOne({email:email});

        if(user){
            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                res.status(400).json({error:'User error'});
            }else{
                res.json({message:'User Logged in successfully'});
                console.log(user);
                const token = await user.generateAuthToken();
                console.log(token);
            }
        }else{
            res.json({error:'User error'});
        }
        


    }catch(err){
        console.log(err);
    }
})

module.exports = router;