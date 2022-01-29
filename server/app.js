const
  path = require('path'),
  logger = require('morgan'),
  express = require('express'),
  createError = require('http-errors'),
  partials = require('express-partials'),
  cookieParser = require('cookie-parser'),
  indexRouter = require('./routes/index'),
  apiRouter = require('./routes/api'),
  app = express();

// Add layout support for views
app.use(partials());
app.set("layout extractScripts", true)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// EXAMPLE: only log error responses
app.use(logger('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Added bootstrap 
app.use('/fonts', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

  console.log(err.message);

});

module.exports = app;
