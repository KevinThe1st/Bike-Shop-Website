var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register-user');
var itemsRouter = require('./routes/items');
var textRouter = require('./routes/text')
var ordersRouter = require('./routes/orders');
var categoriesRouter = require('./routes/categories');
var serviceRouter = require('./routes/services');
var orderItemRouter = require('./routes/order-item');
var addressRouter = require('./routes/addresses');
var uploadRouter = require('./routes/upload');

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
app.use('/register', registerRouter);
app.use('/items', itemsRouter);
app.use('/textbox', textRouter);
app.use('/orders', ordersRouter);
app.use('/categories', categoriesRouter);
app.use('/services', serviceRouter);
app.use('/orderItems', orderItemRouter);
app.use('/addresses', addressRouter);
app.use('/upload', uploadRouter);

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

app.route('/upload').post(function (req, res, next) {
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
    console.log("Uploading: " + filename);
    fstream = fs.createWriteStream(__dirname + '/img/' + filename);
    file.pipe(fstream);
    fstream.on('close', function () {
      console.log("Upload Finished of " + filename);
      res.redirect('back');           //where to go next
    });
  });
});

module.exports = app;
