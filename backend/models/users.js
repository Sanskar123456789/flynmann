const mongoose = require('mongoose');
// user schema this will hold the data of user and its topic
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phone:{
        type:Number, 
        required:true
    },
    topics:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topic'
    }]
})
//user exported
exports.users = mongoose.model('users',userSchema);