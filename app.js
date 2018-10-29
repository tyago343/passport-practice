var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var indexRouter = require('./routes/index');
var logoutRouter = require('./routes/logout')
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var privateRouter = require('./routes/private');
const {db} = require  ('./models/Users.js')
const { User } = require('./models/Users');


var app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "cats" }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    User.findOne({where: { email: username }})
    .then(user => {console.log(user.passwordHash(password, user.salt))
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.passwordHash(password, user.salt) != user.password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
    
  }
));

passport.serializeUser(function(user, done) {
  console.log('serialize')
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('deserialize')
  done(null, user);
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', registerRouter)
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/private', privateRouter);
app.use('/logout' , logoutRouter);

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

db.sync()
module.exports = app;
