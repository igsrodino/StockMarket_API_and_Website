const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

/* Search by Industry */
router.get("/stocks/symbols", function(req, res){
  const query = req.query.industry ? req.query.industry : "";

  if(Object.keys(req.query).length > 0 && !query){
    res.status(400).json({error: true, message: "Bad Request"})
  }
  // if(Object.keys(req.query).length > 0 && !req.query.industry){
  //   res.status(404).json({error: true, message: "Not Found"})
  // }

  req.db
    .from('stocks')
    .distinct('name', 'symbol', 'industry')
    .where('industry', 'like', `%${query}%` )   
    .then((rows) => {
      if (rows.length === 0){ // NEED TO WRITE AS QUERY NOT FOUND, NOT NO QUERY
        //return 
         res.status(404).json({error: true, message: "Not Found"})
      }
      else{
        res.json(rows)}})

    .catch((err) => {
      res.json({"Error": true, "Message": "Error in  MySQL query" + err}) 
      })
  });
   

/* Search by Symbol */
router.get('/stocks/:symbol', function(req, res){
  const param = req.params.symbol;
  
  req.db
  .from('stocks')
  .select('*')  
  .where({symbol: param}) 

  // Check to see user inputs a stock code only in capital letters and max 5 characters
  .then((rows) => {
    if (!param.match(/\b[A-Z]{1,5}\b/)) { 
      return res.status(400).json({
        error: true,
        message: "Bad Request"
      })
    }

    // Check if stock searched exists
    else if (rows.length === 0){
      return res.status(404).json({ 
        error: true,
        message: "No entry for symbol in stocks database"
      })
    }
    
    else{
      res.json(rows[0])}})

  .catch((err) => {
      res.json({"Error": true, "Message": "Error in  MySQL query" + err}) 
  })
});



// For verifying tokens for authed route
const authorize = (req, res, next) => {
  const authorization = req.headers.authorization
  let token = null

  // Retrieve the token
  if (authorization && authorization.split(" ").length === 2) {
    token = authorization.split(" ")[1]
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

    // Check if token has expired
    if (decoded.exp > Date.now()){
      res.status(403).json({
        error:true, 
        message: "Token expired"})
      return
    }

    // Let user to advance to route
    next()

  }
  catch (err) {
    res.status(403).json({
      error:true, 
      message: "Token is not valid." + err})
    return
  }
}



/* Search by Authed Symbol */
router.get('/stocks/authed/:symbol', authorize, function(req, res){
  const from = req.query.from;
  const to = req.query.to;
  const symbol = req.params.symbol;
  const minDate = '2019-11-05T00%3A00%3A00.000Z';
  const maxDate = '2020-03-25T00%3A00%3A00.000Z';

  // If user doesn't input a from or to date, show error 400
  if(!from || !to){
    res.status(400).json({error: true, message: "Bad Request"})
  }
  if(Object.keys(from).isDate || Object.keys(to).isDate){
    res.status(400).json({error: true, message: "Bad Request"}) //DOESN'T WORK
  }   // DOESN'T WORK use moment library

  // If user enteres a date that is out of bound, show error 404
  if(from < minDate || to > maxDate){
    res.status(404).json({error: true, message: "Not Found"})
  }

  req.db.
  from('stocks')
  .select('*')
  .where({symbol}) 
  .whereBetween('timestamp', [from, to])
  
  .then((rows) => {
    res.json(rows)})

  .catch((err) => {
    res.json({"Error": true, "Message": "Error in  MySQL query" + err}) 
  })
});







module.exports = router;
