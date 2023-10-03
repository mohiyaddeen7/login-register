const mongoose = require('mongoose')

const {Schema} = mongoose

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,//foreign key
        ref:'user' //model to be referred
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default:"General"
    },
    timeStamp:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('notes',NotesSchema)