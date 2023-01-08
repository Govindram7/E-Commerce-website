const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");
const signup = require("../models/signup");
const Signup = require("../models/signup");


// get req to read the data of database
router.get("/", (req, res, next) => {
    signup.find()
        .then(result => {
            res.status(200).render("signup")
        })
        .catch(err => {
            res.status(500).json({
                error: "err"
            })
        })
})


// post req to add signup data in a databse

router.post("/", (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                err: "faild"
            })
        } else {
            const signup = new Signup({
                //  _id:new mongoose.Type.ObjectId,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                contact: req.body.contact,
                password: hash
            })

            signup.save()
                .then(result => {
                    
                    res.status(200).render("index")
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: "Enter Correct Detail"
                    })
                })
        }
    })
})


module.exports = router;

