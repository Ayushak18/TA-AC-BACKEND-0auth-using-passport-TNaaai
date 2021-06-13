var express = require('express');
var router = express.Router();
let passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/failure', (req, res) => {
  res.send('Failed in authentication');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/');
});

// Where we send the request to github
router.get('/auth/github', passport.authenticate('github'));

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/failure',
  }),
  (req, res) => {
    res.send('Autentication Successful');
  }
);

module.exports = router;
