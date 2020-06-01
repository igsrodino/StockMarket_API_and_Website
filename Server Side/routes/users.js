const express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
var jwt = require('jsonwebtoken');


router.post('/register', function (req, res, next){
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
  }})
  .then(() => {
    res.status(201).json({success: true, message: "User created"})
  })
})


router.post("/login", function(req, res, next){
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
    if (users.length === 0) {
        console.log("User does not exist")
        return;
    }
    else{
    console.log("User exists in table")
    //Compare password hashes
    const user = users[0]
    return bcrypt.compare(password, user.hash)
  }})

  .then((match) => {
      if (!match) {
          res.status(401).json({
              error: true,
              message: "Incorrect email or password"
          })  
          //console.log("Passwords do not match")
          return
      }


      //Create and return JWT token
      const secretKey = "secret key"
      const expires_in = 60*60*24 //1 day
      const exp = Math.floor(Date.now() /1000) + expires_in
      const token = jwt.sign({email, exp}, secretKey)
      res.json({token_type: "Bearer", token, expires_in})
      console.log("Passwords match")
  })
  .then(() => {
    res.status(201).json({success: true, message: "User logged in"})
  })

})



module.exports = router;
