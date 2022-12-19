const mongoose = require('mongoose');
// block schema store data of individual block
const blockSchema = mongoose.Schema({
    block:{
        type:String,
        required:true
    },
    points:{
        type:Number,
        default:1
    }
})
//block schema exported
exports.block = mongoose.model('block',blockSchema)