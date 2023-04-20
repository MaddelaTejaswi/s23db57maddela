var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


require('dotenv').config();
const connectionString =
process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{useNewUrlParser: true,
useUnifiedTopology: true});



//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var QRouter = require('./routes/queen');
var BRouter = require('./routes/board');
var SRouter = require('./routes/selector');
var queen = require("./models/queen");
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/queen',QRouter);
app.use('/board',BRouter);
app.use('/selector',SRouter);
app.use('/resource',resourceRouter);
// We can seed the collection if needed on
//server start
async function recreateDB(){
 // Delete everything
 await queen.deleteMany();
 let instance1 = new
queen({Queen_name:"Tejaswi",Queen_age:18,Queen_height:51});
 instance1.save().then(doc=>{
 console.log("First object saved")}
 ).catch(err=>{
 console.error(err)
 });
 let instance2 = new
 queen({Queen_name:"Sanrita",Queen_age:22,Queen_height:33});
  instance2.save().then(doc=>{
  console.log("Second object saved")}
  ).catch(err=>{
  console.error(err)
  });
  let instance3 = new
  queen({Queen_name:"Emma Watson",Queen_age:24,Queen_height:57});
   instance3.save().then(doc=>{
   console.log("Third object saved")}
   ).catch(err=>{
   console.error(err)
   });
}
let reseed = true;
if (reseed) {recreateDB();}

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
