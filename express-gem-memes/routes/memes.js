var express = require('express');
var router = express.Router();
var memes = require('../public/images/memes.json');

router.get('/:id?', function(req,res,next){
	if (req.params.id !== undefined){
	res.send(memes[req.params.id]);
	}
	else{
		res.send(memes);
	}
});

/* POST creates a meme and adds it to the json file */
router.post('/', function(req, res, next) {

  // req.body comes from $.ajax data
  var newGif = {
    url: req.body.url,
    imageId: req.body.imageId
  };

  // push the new element to the array
  memes.push(newGif);

  // stringify it so that it will write to the array correctly
  var string = JSON.stringify(memes);

  // This is the path the file is in
  var filePath = path.join(__dirname, '../public/images/memes.json');

  // write the stringified version to the file
  fs.writeFile(filePath, string, function(err) {
    if (err) {
      // if there is an error, "next" middleware will handle it.
      // Next in our case is the error handler in app.js
      next(err);
    } else {
      // it's all good! Send the object back.
      res.send(newGif);
    }
  });
});

module.exports = router;