const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.send('Logged correctly');
});

module.exports = router;