var express = require('express');
const mysql = require('mysql')

var router = express.Router();
// var myLogger = function (req, res, next) {
//   console.log('LOGGED')
//   next()
// }

// router.use(myLogger)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stocks API' });
  next()
});

// router.get('/knex', function(req,res,next) { 
//   req.db.raw("SELECT VERSION()").then( 
//     (version)  =>  console.log((version[0][0])) 
//     ).catch((err) =>  {console.log(err); throw err})
//     res.send("Version Logged successfully");
//   });   

/* API page. */
router.get('/api', function(req, res, next) {
  res.render('index', { title: 'Routes available' });
});

/* All Stocks */
router.get('/stocks/symbols', function(req, res, next){
  // var query = "SELECT DISTINCT name, symbol, industry FROM ?? ORDER BY symbol;";

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



/* Search by Authed Symbol */
router.get('/stocks/authed/:symbol', function(req, res){
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
