const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
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
    textarea:{
        type:String
    }
})

const contact = new mongoose.model("contact", contactSchema);
 module.exports = contact;

