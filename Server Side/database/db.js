const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Cab230!',
    database: 'webcomputing'
});

connection.connect(function(err){
    if (err) throw err;
});
 connection.query('USE webcomputing');

// connection.query('SELECT * from stocks',function(err, result, fields) {
//     if (err) {
//         return console.error(err); 
//     } else {
    	
// 	var arrayLength = result.length; 

// 	for (var i = 0; i <= arrayLength-1; i++) {
// 	    var line = result[i].name + " (" + result[i].symbol + ")";
// 	    console.log(line); 
// 	}
//     }
// }); 

module.exports = (req, res, next)=> {
    req.db = connection;
    next()
}

//connection.end(); 

