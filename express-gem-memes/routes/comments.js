var express = require('express');
var router = express.Router();
var comments = require('../public/images/comments.json');

router.get('/:imageId?', function(req,res,next){
  if (req.params.imageId !== undefined){
  res.send(comments[req.params.imageId]);
  }
  else{
    res.send(comments);
  }
});

/* POST creates a comment and adds it to the json file */
router.post('/', function(req, res, next) {

  // req.body comes from $.ajax data
  var newComment = {
    message: req.body.message,
    imageId: req.body.imageId
  };

  // push the new element to the array
  comments.push(newComment);

  // stringify it so that it will write to the array correctly
  var string = JSON.stringify(comments);

  // This is the path the file is in
  var filePath = path.join(__dirname, '../public/images/comments.json');

  // write the stringified version to the file
  fs.writeFile(filePath, string, function(err) {
    if (err) {
      // if there is an error, "next" middleware will handle it.
      // Next in our case is the error handler in app.js
      next(err);
    } else {
      // it's all good! Send the object back.
      res.send(newComment);
    }
  });
});

module.exports = router;