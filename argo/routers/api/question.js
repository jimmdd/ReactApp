var express = require('express');
var router = express.Router();

//get questions from db
router.get('/', function(req, res, next) {
  res.sendFile(pth.join(__dirname, '../public/index.html'));  
});


module.exports = question;