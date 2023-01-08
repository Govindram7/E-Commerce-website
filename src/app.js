const express = require ("express");
const app = express();
const mongoose = require("mongoose");
const hbs = require("hbs");
const bcrypt = require("bcrypt");
const path = require("path");
const bodyparser = require("body-parser");
const productRoutes = require("./api/routes/product");
const signupRoutes =require("./api/routes/signup");
const loginRoutes = require("./api/routes/login");
const contactRoutes = require("./api/routes/contact");

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://Govind:Govindram73@ac-ocui6yb-shard-00-00.6xily7a.mongodb.net:27017,ac-ocui6yb-shard-00-01.6xily7a.mongodb.net:27017,ac-ocui6yb-shard-00-02.6xily7a.mongodb.net:27017/?ssl=true&replicaSet=atlas-re1bcq-shard-0&authSource=admin&retryWrites=true&w=majority')

mongoose.connection.on('error', err=>{
    console.log(err);
});
mongoose.connection.on('connected', connected=>{
    console.log('connection sucessfull to database');
});

// path of the files
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use("/product",productRoutes);
app.use("/signup",signupRoutes);
app.use("/login",loginRoutes);
app.use("/contact",contactRoutes);

app.get("/", (req, res) => {
    res.render("index")
})


app.use("", (req,res,next)=>{
    res.status(404).render("404page")
})

module.exports = app;



