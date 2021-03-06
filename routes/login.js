const express = require('express');
const router = express.Router();
const { User } = require('../models/Users');
var passport = require('passport');

router.get('/', function(req, res){
  res.render('login', {title: 'Login papa'});
});

router.post('/logged', passport.authenticate('local', {successRedirect: '/private', failureRedirect: '/login'}));

module.exports = router;