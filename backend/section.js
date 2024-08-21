const mongoose = require("mongoose");
const newSchema= mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    imglist:{
        type:Array,
        required: true
    }
});
module.exports=mongoose.model('section',newSchema);