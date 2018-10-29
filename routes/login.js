const express = require('express');
const router = express.Router();
const { User } = require('../models/Users');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

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

router.get('/', function(req, res){
    res.render('login', {title: 'Login papa'});
});

router.post('/logged', passport.authenticate('local', {successRedirect: '/private', failureRedirect: '/login'}));

module.exports = router;