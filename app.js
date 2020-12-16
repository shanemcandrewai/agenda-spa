const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const sqlite3 = require('sqlite3').verbose();
const PORT = process.env.PORT || 5000
const db = new sqlite3.Database('nodelogin.db');
const session = require('express-session')
 

const app = express();
app.use(express.static('public'))
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: false}));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));

function findById(username, cb) {
  return cb(null, {id: 1, username: 'sss', password: 'sss'})
}

function findByUsername(username, cb) {
  return cb(null, {id: 1, username: 'sss', password: 'sss'})
}


passport.use(new Strategy(
  function(username, password, cb) {
    findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get('/',
  function(req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });

app.get('/login',
  function(req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });


//app.post('/', 
//  passport.authenticate('local', { failureRedirect: '/login' }),
//  function(req, res) {
//    res.redirect('/');
//  });

app.post('/',
  passport.authenticate('local', { successFlash: true, failureFlash: true })
);
  
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.listen(PORT, () => console.log(`agenda-spa listening at http://localhost:${PORT}`))
