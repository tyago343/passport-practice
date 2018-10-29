var express = require('express');
var router = express.Router();
var { User } = require('../models/Users');

router.get('/',function(req,res)  {
  res.render('form', {title: 'New user'})
});

router.post('/newuser', function(req, res){
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(response => response ? alert('El usuario ya existe') : User.create({email: req.body.email, password: req.body.password}))
  .then(res.redirect('/'));
});

module.exports = router;