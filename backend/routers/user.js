const express = require('express');
const router = express.Router();
const {users} = require('../models/users');


// to get all users
router.get('/all',async (req, res) => {
    const data = await users.find().populate({path:'topics',populate:'data'});
    if(data){
        res.status(200).send({status: true,data});
    }else{
        res.status(404).send({status: false,message: 'Not found'})
    }
})

// for saving new user
router.post('/new',async (req, res) => {
    let findUser = await users.find({email:req.body.email}).populate({path:'topics',populate:'data'});
    if(findUser[0]){
        res.status(200).send({status: false,message:"User already exist"})
    }else{
        let user = new users({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        })
    
        user = await user.save();
    
        if(user){
            res.status(200).send({status: true,user})
        }else{
            res.status(200).send({status: false,message:"not saved"})
        }
    }
})

//login
router.post('/login',async(req,res) =>{
    const user =await users.find({email:req.body.email}).populate({path:'topics',populate:'data'});
    if(user[0]) {
        res.status(200).send({status: true,user:user[0]})
    }else{
        res.status(200).send({status:false, message:"User Not Found"});
    }
})

module.exports = router;