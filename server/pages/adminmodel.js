const mongoose =require('mongoose');
const adminschema=new mongoose.Schema({
    "username":{
        type:String,
        required:true
    },
    "password":{
        type:String,
        required:true
    }
})

module.exports=adminmodels=mongoose.model('adminmodels', adminschema)