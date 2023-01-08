const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = new mongoose.Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    firstname: String,
    lastname: String,
    email: String,
    conatact: Number,
    password:String,
    cpassword:String
})

const product = new mongoose.model("product", productSchema);
module.exports = product;

