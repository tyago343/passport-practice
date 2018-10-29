const express = require('express');
const router = express.Router();

router.use((req,res, next)=> {
    console.log(req.isAuthenticated())
    if(!req.isAuthenticated()) return res.redirect('/login')
    next()
})

router.get('/', function(req, res){
    res.send('Logged correctly');
});

module.exports = router;