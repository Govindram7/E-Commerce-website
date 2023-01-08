const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    // _id:mongoose.Schema.Types.ObjectId,

    firstname: {
        type: String,
        require: true,
        minlength: 2
    },
    lastname: {
        type: String,
        require: true
    },
    email :{
        type: String,
        require: true,
        unique :[true, "Email is already exist"]
    },
    contact :{
        type: String,
        require: true,
        unique :[true, "No. already exist  "]
    },
    password:{
        type:String
    },
    cpassword:{
        type:String
    }
})

const signup = new mongoose.model("signup", signupSchema);
 module.exports = signup;

