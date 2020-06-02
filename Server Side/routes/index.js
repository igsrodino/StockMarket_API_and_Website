const express = require('express');
const mysql = require('mysql')

var router = express.Router();
var jwt = require('jsonwebtoken');


/* API page. */
router.get('/api', function(req, res, next) {
  res.render('index', { title: 'Routes available' });
});

/* All Stocks */
router.get('/stocks/symbols', function(req, res, next){
  req.db.from('stocks').distinct('name', 'symbol', 'industry').orderBy('symbol')
  .then((rows) => {
    res.json(rows)})
    
  .catch((err) => {
    console.log(err);
    res.json({"Error": true, "Message": "Error in  MySQL query"}) 
  })
  next()
}); 

/* Search by Industry */
router.get("/stocks/symbols", function(req, res){
  req.db
  .from('stocks')
  .distinct('name', 'symbol', 'industry')
  .where({industry: req.query.industry})   
  .then((rows) => {
    res.json(rows)})

  .catch((err) => {
    console.log(err);
    res.json({"Error": true, "Message": "Error in  MySQL query"}) 
    })
  });
   

/* Search by Symbol */
router.get('/stocks/:symbol', function(req, res){
  req.db
  .from('stocks')
  .select('*')
  .where({symbol: req.params.symbol}) 
  .then((rows) => {
    res.json(rows)})

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
    res.status(401).json({
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
  const to = req.query.to;// JSON SHOWING 1 LESS DAY THAN SWAGGER QUT API
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
