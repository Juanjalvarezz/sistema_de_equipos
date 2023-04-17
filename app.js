var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//se agrego la variable usersRouter
var usersRouter = require('./routes/user');
var trabajosRouter = require('./routes/trabajos');
var equiposRouter = require('./routes/equipos');
var espaciosRouter = require('./routes/espacios');
var personal_tecnicoRouter = require('./routes/personal_tecnico');
var reservasRouter = require('./routes/reservas');
var solicitantesRouter = require('./routes/solicitantes');
//se agrego la variable usuariosRouter
var usuariosRouter = require('./routes/usuarios');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//se agrego el app.use /users
app.use('/users', usersRouter);
app.use('/trabajos', trabajosRouter);
app.use('/equipos', equiposRouter);
app.use('/espacios', espaciosRouter);
app.use('/personal_tecnico', personal_tecnicoRouter);
app.use('/reservas', reservasRouter);
app.use('/solicitantes', solicitantesRouter);
//se agrego el app.use /usuarios
app.use('/usuarios', usuariosRouter);


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

//Creando el mensaje del listener del servidor
var PORT = 3001
app.listen(PORT, function(err){
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
}); 
module.exports = app;
