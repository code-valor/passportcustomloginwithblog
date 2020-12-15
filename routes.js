const passport = require('passport');
const Account = require('./models/account');
const router = require('express').Router();
const BlogPost = require('./models/blogpost');

router.get('/', function(req, res) {
  Account.find({userType: "Kullanıcı"}).then((data) => {
    BlogPost.find({}).then((dd) => {
      res.render('index', {user: req.user,account: Account,accounts: data, posts: dd});
    });
  }).catch((err) => {
    if (err) throw err;
    if (err) res.render('index', {user: req.user, account: Account});
  })
  
});

router.get('/register', function(req, res) {
  res.render('register', {});
});

router.get('/createPost', function(req, res) {
  res.render('newpost', {user: req.user});
});

router.post('/newPost', function(req, res, next) {
    const post = new BlogPost({title: req.body.titlePost, author: req.body.authorPost, birthdate: req.body.datePost});
    post.save();
});

router.get('/post/:postID', function(req, res) {
    const postid = req.params.postID;
    BlogPost.findOne({ _id: postid }).then((data) => {
      res.render('postview', {data: data});
      console.log(data);
    }).catch((err) => {
      if (err) throw err;
    });
});

router.get('/user/:userID', function(req, res) {
    const userid = req.params.userID;
    Account.findOne({ _id: userid }).then((data) => {
      res.render('userview', {thisuser: data});
    }).catch((err) => {
      if (err) return res.send('Aradığınız kullanıcı bulunamadı!');
    })
    
});

router.post('/register', function(req, res, next) {
  console.log('registering user');
  Account.register(new Account({username: req.body.username, birthdate: Date.now(), userType: 'Kullanıcı'}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });
});

router.get('/login', function(req, res) {
  res.render('login', {user: req.user});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;