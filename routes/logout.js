const express = require('express');
const router = express.Router();
const { User } = require('../models/Users');

var passport = require('passport');

router.get('/', function(req, res){
    res.redirect('/')
});

module.exports = router;