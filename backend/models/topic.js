const mongoose = require('mongoose');

// topic Schema this will hold title of topic and blocks data
const topicSchema = mongoose.Schema({
    title:{
        type: 'string',
        required: true
    },
    data:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'block'
    }]

})

// topic schema exported
exports.topic = mongoose.model('topic',topicSchema)