var express = require('express');
var router = express.Router();


/* GET home page. */
var txt_example = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam."


router.get('/:siteData', function(req, res, next) {
  var data = require('../content/' + req.params.siteData + '.json');
  res.render('theme1/index', {device: req.device.type, data: data});
});

module.exports = router;
