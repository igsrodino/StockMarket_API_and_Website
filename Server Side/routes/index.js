const express = require('express');
const mysql = require('mysql')

var router = express.Router();
var jwt = require('jsonwebtoken');


/* All Stocks */
router.get('/stocks/symbols', function(req, res, next){
  req.db.from('stocks').distinct('name', 'symbol', 'industry').orderBy('symbol')
  .then((rows) => 
    {
    if(Object.keys(req.query).length === 0 ){
      res.json(rows)}})
  
  next() // Comment this line out and empty search works, but .get below stops working
}); 

/* Search by Industry */
router.get("/stocks/symbols", function(req, res){
  var query = req.query.industry;
  console.log(req.query)
  console.log(req.query.industry)

  if(Object.keys(req.query).length > 0 && !req.query.industry){
    res.status(400).json({error: true, message: "Bad Request"})
  }
  if(Object.keys(req.query).length > 0 && !req.query.industry){
    res.status(404).json({error: true, message: "Not Found"})
  }
  req.db
    .from('stocks')
    .distinct('name', 'symbol', 'industry')
    .where('industry', 'like', `%${query}%` )   // HOW TO USE LIKE IN NON RAW
    .then((rows) => {
      res.json(rows)})

    .catch((err) => {
      console.log(err);
      res.json({"Error": true, "Message": "Error in  MySQL query"}) 
      })
  });
   

/* Search by Symbol */
router.get('/stocks/:symbol', function(req, res){
  var param = req.params.symbol;
  
  req.db
  .from('stocks')
  .select('*')  
  .where({symbol: param}) 

  .then((rows) => {
    if (!param.match(/\b[A-Z]{1,5}\b/)) { //WORKS BUT FAILS TESTS
      return res.status(400).json({
        error: true,
        message: "Bad Request"
      })
    }

    else if (rows.length === 0){
      return res.status(404).json({ // WORKS
        error: true,
        message: "No entry for symbol in stocks database"
      })
    }
    
    else{
      res.json(rows[0])}})

  .catch((err) => {
      console.log(err);
      res.json({"Error": true, "Message": "Error in  MySQL query"}) 
  })
});

const authorize = (req, res, next) => {
  const authorization = req.headers.authorization
  let token = null
  console.log(authorization)

  // Retrieve the token
  if (authorization && authorization.split(" ").length === 2) {
    token = authorization.split(" ")[1]
    console.log("Token: ", token)
  }
  else {
    res.status(403).json({
      error:true, 
      message: "Unauthorized"})
    return
  }
  const secretKey = "secret key"
  //Verify JWT and check expiration date
  try {
    const decoded = jwt.verify(token, secretKey)

    if (decoded.exp > Date.now()){
      console.log("Token has expired")
      return
    }
    // Permit the user to advance to route
    next()

  }
  catch (err) {
    console.log("Token is not valid: ", err)
  }
}

/* Search by Authed Symbol */
router.get('/stocks/authed/:symbol', authorize, function(req, res){
  const from = req.query.from;
  const to = req.query.to;
  const minDate = '2019-11-05T00%3A00%3A00.000Z';
  const maxDate = '2020-03-25T00%3A00%3A00.000Z';

  if(!req.query.from || !req.query.to){
    res.status(400).json({error: true, message: "Bad Request"})
  }
  if(req.query.from < minDate || req.query.to > maxDate){
    res.status(404).json({error: true, message: "Not Found"})
  }

  req.db.
  from('stocks')
  .select('*')
  .where({symbol: req.params.symbol}) 
  .whereBetween('timestamp', [from, to]) //THIS WORKS (NEED TO ADD IF STATEMENTS FOR INCASE USER DOESN'T ENTER A FROM OR A TO DATE, SO IT STILL SHOWS DATA)
  
  .then((rows) => {
    res.json(rows)})

  .catch((err) => {
    console.log(err);
    res.json({"Error": true, "Message": "Error in  MySQL query"}) 
  })
});







module.exports = router;
