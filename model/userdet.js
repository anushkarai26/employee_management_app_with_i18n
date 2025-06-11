const mongoose = require('mongoose');


//User Schema
const UserSchema=mongoose.Schema({
    Name:{
        type:String
    },
    email:{
        type:String,
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
    },
    hash:String,
    salt:String
});

const User=module.exports=mongoose.model('User',UserSchema);

module.exports=User;



