const express = require('express');
const router = express.Router();
const {users} = require('../models/users');
const {topic} = require('../models/topic');
const {block} = require('../models/block');

// new topics
router.post('/newTopic/:userId', async (req, res)=>{
    let user = await users.findById(req.params.userId); // get the user's data that make the request

    if(user){ // if user exist we will go next step
        let s = req.body.topic; // s will carry the string on which we will perform our operaion
        let bIndex = 0; // bIndex will hold the value of where last block ended
        let prevData = []; // prevData will contain blocks that we will generate

        for(i=0;i<=s.length;i++){
            if( s[i] == ',' || 
                s[i] == '-' || 
                s[i] == '/' || 
                s[i] == '(' || 
                s[i] == ')' || 
                s[i] == '[' ||
                s[i] == ']' ||
                s[i] == '{' ||
                s[i] == '}' ||
                s[i] == "'" ||
                s[i] == '"' ||
                s[i] == ';' ||
                s[i] == ':' ||
                s[i] == '?' ||
                s[i] == '.' ||
                s[i] == '|' ||
                s[i] == '\\n' ||
                s[i] == "\\" 
                ){
                    let a = s.slice(bIndex,i)// seprating the blocks
                    prevData.push(a);// pushing block to prevData
                    bIndex = i; // updating Bindex value
                }
                if(i==s.length){ // this will add the last block
                    let a = s.slice(bIndex,i)
                    prevData.push(a);
                }
            }

            
            let topicDataArray = []; // this will contain the all blocks Id that's been getting saved to update in Topics Model
            for(let i=0;i<prevData.length;i++){
                let newBlock = new block({
                    block: prevData[i],
                });
                newBlock = await newBlock.save(); // new block is saved
                topicDataArray.push(newBlock._id); // new block Id is been pushed here
            }


            let newTopic = new topic({
                title:req.body.title,
                data:topicDataArray
            }); //new  topic model is generated

            newTopic = await newTopic.save();//new  topic is getting saved

            let newTopicArray = user.topics // newTopicArray getting the previous topic stored in user
            newTopicArray.push(newTopic._id); // new topic id is pushed in newTopicArray
            user = await users.findByIdAndUpdate(user._id,{
                topics:newTopicArray
            },{new:true}).populate({path:'topics',populate:'data'}) // user Model is updated with newTopicArray
            res.status(200).send({status:true, user});// res send
    }else{
        res.status(200).send({status:false, message:"User Not Found"}); // user not found response
    }
})

// updating block
router.post('/updateTopic/:userId',async (req,res)=>{
    let user = await users.findById(req.params.userId) // getting user data that made request

    // if user exist then we will proceed with the update logic
    if(user){
        let newBlock = await block.findByIdAndUpdate(req.body.data._id,
            {
                points: req.body.data.points
            },
            {new: true}
        ); // block updated

        user = await users.findById(req.params.userId).populate({path:'topics',populate:'data'}) // new user data fetch
        res.status(200).send({status:true,user});// response send back to the client
    }else{
        res.status(200).send({status:false, message:"user not found"});// user not found  response
    }
})

// router exported
module.exports = router;