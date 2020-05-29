var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

const swaggerUI =  require('swagger-ui-express'); 
yaml = require('yamljs');
const swaggerDocument = yaml.load('./swagger.yaml'); 

const addRequestId = require('express-request-id')();
var morgan = require('morgan');
const logger = require('./logger')

// const db = require('./database/db');
const options = require('./knexfile.js');
const knex = require('knex')(options);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(addRequestId);

morgan.token('id', function getId(req) {
  return req.id
});

var loggerFormat = ':id [:date[web]] ":method :url" :status :response-time\n';

app.use(morgan(loggerFormat, {
  skip: function (req, res) {
      return res.statusCode < 400
  },
  stream: process.stderr
}));

app.use(morgan(loggerFormat, {
  skip: function (req, res) {
      return res.statusCode >= 400
  },
  stream: process.stdout
}));

app.use((req, res, next) => {
  var log = logger.loggerInstance.child({
    id: req.id,
    body: req.body
  }, true)
  log.info({
    req: req
  })
  next();
});

app.use(function (req, res, next) {
  function afterResponse() {
      res.removeListener('finish', afterResponse);
      res.removeListener('close', afterResponse);
      var log = logger.loggerInstance.child({
          id: req.id
      }, true)
     log.info({res:res}, 'response')
  }

  res.on('finish', afterResponse);
  res.on('close', afterResponse);
  next();
});



app.post("/stuff", function (req, res) {

  var response = {
      fullname: `${req.body.firstname} ${req.body.lastname}`
  }
  logger.logResponse(req.id, response, 200);
  res.status(200).send(response);
});





app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(db);
app.use((req, res, next) => {
  req.db = knex
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;





// var express = require('express');
// var app = express();

// var requestTime = function(req, res, next) {
//     req.requestTime = Date.now()
//     next()
// }

// app.use(requestTime)

// const hostname = '127.0.0.1';
// const port = 3000;

// app.get('/', function (req , res) {
//     var responseText = 'hello Iggy!<br>'
//     responseText += '<small>Requested at: ' + req.requestTime + '</small>'
//     res.send(responseText)
//     });

// app.listen(port, function () {
//     console.log(`Express app listening at http://${hostname}:${port}/`);
// });

