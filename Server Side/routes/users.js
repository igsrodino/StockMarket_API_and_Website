const express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();



router.post('/register', function (req, res, next){
  console.log("asdksd")
const email = req.body.email
const password = req.body.password

//Verify body
if (!email || !password){
  res.status(400).json({
    error: true,
    message: "Request body incomplete - email and password needed"
  })
  return;
}

const queryUsers = req.db.from("users").select("*").where("email", "=", email)
queryUsers
  .then ((users) => {
    if (users.length > 0) {
      res.status(409).json({
        error:true, 
        message: "User already exists!"
      });
      return;
    }
    else{

    //Insert user into DB
    const saltRounds = 10
    const hash = bcrypt.hashSync(password, saltRounds)
    return req.db.from("users").insert({email, hash})
  }
  })

  .then(() => {
    res.status(201).json({success: true, message: "User created"})
  })







})





module.exports = router;
