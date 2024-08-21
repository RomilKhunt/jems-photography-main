const mongoose = require("mongoose");
const newSchema= mongoose.Schema({
    link:{
        type:String,
        required:true
    },
    index: {
        type:Number,
        required:true
    }
});
module.exports=mongoose.model('mainSlider',newSchema);