const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();
const product = require("../models/product");

// get req to read the data of database
router.get("/", (req, res, next) => {
    product.find()
        .then(result => {
            res.status(200).json({
                productdata: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

// get req to read the data of database by unique id 
router.get("/:id", (req, res, next) => {
    console.log(req.params.id)
    product.findById(req.params.id)
        .then(result => {
            res.status(200).json({
                productdata: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

// post method to add data in database
router.post("/", (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                err: "faild"
            })
        } else {
            const product = new product({
                //  _id:new mongoose.Type.ObjectId,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                contact: req.body.contact,
                password: hash,
                cpassword:hash
            })

            product.save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        new_user: result
                    })
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })
})

// delete any one data by unique id 
router.delete("/id", (req, res, next) => {
    product.remove({ _id: req.params.id })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "data is delete successfully"
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

// put req to update the data of database

router.put("/:id", (req, res, next) => {
    console.log(req.params.id)
    product.findOneAndUpdate({ _id: req.params.id },
        {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                contact: req.body.contact,
                password: req.body.password,
                cpassword: req.body.cpassword
            }
        })
        .then(result=>{
           res.status(200).json({
            update_data:result
           })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
})

// patch req to update ther data of database


module.exports = router;
