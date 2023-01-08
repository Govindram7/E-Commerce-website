const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    email: String,
    password: String
})

const login = new mongoose.model("login", loginSchema);
module.exports = login;

