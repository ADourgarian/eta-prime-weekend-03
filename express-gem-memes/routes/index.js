var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var memes = require('../public/images/memes.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Memes', memes: memes });
});

module.exports = router;
