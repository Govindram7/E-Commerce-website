const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
const contact = require("../models/contact");

// get req to read the data of database
router.get("/", (req, res, next) => {
  res.render("contact")
})


// post req to add signup data in a databse

router.post("/", (req, res, next) => {

  const Contact = new contact({
    //  _id:new mongoose.Type.ObjectId,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    contact: req.body.contact,
    textarea: req.body.textarea
  })

  Contact.save()
    .then(result => {

      res.status(200).render("index")
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: "Enter Correct Detail"
      })
    })
}

)



module.exports = router;

