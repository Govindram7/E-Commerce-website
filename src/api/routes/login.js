const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const login = require("../models/login");
const signup = require("../models/signup");



// get method of the login  page
router.get("/" , (req,res)=>{
    res.render("login")
})

// login page start
router.post("/", (req, res, next) => {
    signup.find({email:req.body.email})
        .exec()
        .then(login => {
            if (login.length < 1) {
                return res.status(401).json({
                    msg: "user not exist"
                })
            }
            bcrypt.compare(req.body.password, login[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        msg: "password are not matched"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        username:login[0].email,
                        firstname: login[0].firstname,
                        lastname: login[0].lastname,
                        email: login[0].email,
                        contact: login[0].contact
                    },
                        "hello guys",
                        {
                            expiresIn: "2h"
                        });
                    res.status(200).render("index")
                }
            })
        })
})

module.exports = router;

