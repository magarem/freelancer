var express = require('express');
var router = express.Router();

/* GET home page. */

var data = {
  title: 'Radhe',
  menu:{
    name:{
      portfolio: 'trabalhos',
      about: 'sobre',
      contact: 'contato'
    }
  },
  masthead:{
    avatar: 'https://images.unsplash.com/photo-1512310604669-443f26c35f52?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
    heading: 'Hadhe',
    subheading: 'Krsna',
  }
}
router.get('/', function(req, res, next) {
  res.render('theme1/index', { data: data });
});

module.exports = router;
