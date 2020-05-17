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


/* API page. */
router.get('/api', function(req, res, next) {
  res.render('index', { title: 'Routes available' });
});

/* All Stocks */
router.get('/stocks/symbols', function(req, res){
  var query = "SELECT DISTINCT name, symbol, industry FROM ?? ORDER BY symbol;";
  var table = ["stocks"];
  query =  mysql.format(query,table);
  req.db.query(query,function(err, rows){
    if(err) {
      res.json({"Error":true, "Message":"Error executing MySQL query"});
    }
    else {
      res.json(rows);
    }
  });
}); 

/* Search by Industry */
router.get('/stocks/symbols?industry=', function(req, res){
  var query = "SELECT DISTINCT name, symbol, industry FROM ?? ORDER BY symbol;";
  var table = ["stocks"];
  query =  mysql.format(query,table);
  req.db.query(query,function(err, rows){
    if(err) {
      res.json({"Error":true, "Message":"Error executing MySQL query"});
    }
    else {
      res.json(rows);
    }
  });
}); 

/* Search by Symbol */
// router.get('/api/stocks/{symbols}', function(req, res){
//   var query = "SELECT * from ??";
//   var table = ["stocks"];
//   query =  mysql.format(query,table);
//   req.db.query(query,function(err, rows){
//     if(err) {
//       res.json({ "Error":true, "Message":"Error executing MySQL query"});
//     }
//     else {
//       res.json({"Error":false, "Message":"Success", 
//       "name": rows});
//     }
//   });
// });  



module.exports = router;
// connection.query('SELECT * from stocks',function(err, result, fields) {
//   if (err) {
//       return console.error(err); 
//   } else {
    
// var arrayLength = result.length; 

// for (var i = 0; i <= arrayLength-1; i++) {
//     var line = result[i].name + " (" + result[i].symbol + ")";
//     console.log(line); 
// }
//   }
// }); 