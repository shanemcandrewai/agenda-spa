const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const path = require('path');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const port = process.env.PORT || 3000;
const app = express();
const db = new sqlite3.Database('nodelogin.db');
//const saltRounds = 12;

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: crypto.randomBytes(20).toString('hex'), resave: false,
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function logRequest(req, res, next) {
  console.log('handling request for: ', req.path, req.method);
  next();
});

function findByUsername(username, cb){
  db.get('select * from user where name = ?', username,
    function returnResults(err, row) {
      return cb(null, row);
    });
}

function findById(id, cb){
  db.get('select * from user where id = ?', id,
    function returnResults(err, row) {
      return cb(null, row);
    });
}

passport.use(new Strategy(
  function verifyCreds(username, password, verify) {
    findByUsername(username, async function validateResults(err, user) {
      if (err) {console.log('xxx err'); return verify(err); }
      if (!user) { console.log('xxx no user'); return verify(null, false); }
      const match = await bcrypt.compare(password, user.password);
      if (match) { console.log('xxx password match');
        return verify(null, user);
      }
      console.log('xxx password mismatch');
      return verify(null, false);
    });
  }));

passport.serializeUser(function setSessionUser(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function getSessionUser(id, cb) {
  findById(id, function getUserId(err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// Define routes.

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.post('/', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function authSuccess(req, res) {
    console.log('xxx req.user ', req.user);
    res.redirect('/');
  });
  
app.get('/logout',
  function logout(req, res){
    req.logout();
    res.redirect('/');
  });

app.use(express.static('public'));
app.listen(port, () => {
  console.log(`agenda-spa app listening at http://localhost:${port}`);
});
