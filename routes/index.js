let express = require('express');
let router = express.Router();

// add passport for reg and login
let passport = require('passport');
let Account = require('../models/account');

/* GET home page. */
router.get('/', function (req, res, next)
{
  res.render('index',
      {
        title: 'AdPoster',
          user: req.user
      });
});

/* GET About page. */
router.get('/about', function (req, res, next)
{
    res.render('about',
        {
            title: 'About',
            user: req.user
        });
});

/* GET Contact page. */
router.get('/contact', function (req, res, next)
{
    res.render('contact',
        {
            title: 'Contact',
            user: req.user
        });
});

/*GET Register page */
router.get('/register', function (req, res, next)
{
    res.render('register',
        {
            title: 'Register',
            user: req.user
        });
});

/* GET login */
router.get('/login', function(req, res, next)
{
    let messages = req.session.messages || [];

    // clear messages from session
    req.session.messages = [];

    res.render('login', {
        title: 'Login',
        messages: messages,
        user: null
    });
});

/* POST register */
router.post('/register', function(req, res, next)
{
    // use the Account model to create a new user account
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
        if (err) {
            console.log(err);
            res.render('error', { title: 'Create Account Error'});
        }
        res.redirect('/login');
    });
});

/* POST login */
router.post('/login', passport.authenticate('local', {
    successRedirect: '/ads',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
}));

/* GET logout */
router.get('/logout', function(req, res, next)
{
    req.logout();
    res.redirect('/');
});

/* Reference: https://developer.linkedin.com/
 *            https://www.npmjs.com/package/passport-linkedin */

/* GET LinkedIn */
router.get('/linkedin',
    passport.authenticate('linkedin', {
        failureRedirect: '/login'
    }));

/* GET LinkedIn/callback */
router.get('/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/ads');
    });


module.exports = router;
