const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const threadSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:50
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
    },
    posts:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Post"
    },
    forum:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Forum"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    userName:{
        type:String,
        required:true,
        trim:true,
    },
    open:{
        type:Boolean,
        default:true
    },
    public:{
        type:Boolean,
        default:true
    },
    stiky:{
        type:Boolean,
        default:false
    },
},{timestamps:true})

const Thread = mongoose.model('Thread', threadSchema);
module.exports = Thread