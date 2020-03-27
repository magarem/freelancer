var express = require('express');
var router = express.Router();
var data = require('../content/data.json');

/* GET home page. */
var txt_example = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam."

// var data = {
//   navigationBar:{
//     title: 'Radhe',
//     menu:{
//     name:{
//       portfolio: 'trabalhos',
//       about: 'sobre',
//       contact: 'contato'
//     }
//   },
//   },
//   masthead:{
//     avatar: 'https://images.unsplash.com/photo-1512310604669-443f26c35f52?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
//     heading: 'Hadhe',
//     subheading: 'Krsna',
//   },
//   portfolio:{
//     heading: 'Portfolio',
//     grid:{
//       items:[
//         {title:'cabin', img: 'theme1/img/portfolio/cabin.png', txt: 'cabin test txt'},
//         {title:'cake', img: 'theme1/img/portfolio/cake.png', txt: 'cake test txt'},
//         {title:'cirsus', img: 'theme1/img/portfolio/circus.png', txt: 'circus test txt'},
//         {title:'game', img: 'theme1/img/portfolio/game.png', txt: 'game test txt'},
//         {title:'safe', img: 'theme1/img/portfolio/safe.png', txt: 'safe test txt'},
//         {title:'submarine', img: 'theme1/img/portfolio/submarine.png', txt: txt_example}
//       ],
//     }
//   },
//   about:{
//     heading: 'Sobre',
//     txt1: txt_example,
//     txt2: txt_example
//   },
//   contactme: {
//     heading: 'Entre em contato',
//     field:{
//       name: 'nome',
//       email: 'email',
//       phone: 'fone',
//       message: 'Mensagem',
//       send: 'Enviar'
//     }
//   },
//   footer:{
//     location: {
//       heading: 'Local',
//       txt: 'Caraíva'
//     },
//     socialmidia:{
//       heading: 'Social links',
//       link:{
//         instagram: '111',
//         facebook: '222',
//         twitter: '33',
//         linkedin: '44'
//       }
//     },
//     footerabout:{
//       heading: 'Sobre',
//       txt:'Maguetão'
//     },
//     copyright:{
//       heading: 'Magaweb',
//       link: 'http://magaweb.com.br'
//     }
//   }
// }

router.get('/', function(req, res, next) {
  res.render('theme1/index', {device: req.device.type, data: data, json1: JSON.stringify(data, undefined, 4) });
});

module.exports = router;
