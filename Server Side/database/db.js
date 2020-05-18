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


module.exports = (req, res, next)=> {
    req.db = connection;
    next()
}


