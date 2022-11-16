var express = require('express');
var router = express.Router();
var passport = require('passport');

var services=require('../services/render')
var controllers=require('../controllers/controllers')

const verifyLogin = (req, res, next) => {
    if (req.session.userloggedIn) next();
    else res.redirect("/login");
  };
  
/* GET home page. */
router.get('/', services.index);

router.get('/login', services.login);

router.get('/signup', services.signup);

router.post('/signup', controllers.signup)

router.post('/login', controllers.login);

router.get('/addbook',verifyLogin, services.addbook);

router.post('/addbook',verifyLogin, controllers.addbook);

router.get('/deletebook/:id',verifyLogin, controllers.delete)

router.get('/editbook/:id',verifyLogin, services.findbook)

router.post('/updatebook/:id',verifyLogin, controllers.updatebook);
module.exports = router;
