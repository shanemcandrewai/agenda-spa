const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const path = require('path')
const session = require('express-session')

const port = process.env.PORT || 3000
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat',
                  resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  console.log('handling request for: ', req.path, req.method);
  next();
});

function findByUsername(username, cb){
  console.log('xxx findByUsername', username);
  return cb(null, { id: 1, username: 'sss', password: 'sss' })
}

function findById(id, cb){
  console.log('xxx findById', id);
  return cb(null, { id: 1, username: 'sss', password: 'sss' })
}

passport.use(new Strategy(
  function(username, password, cb) {
    console.log('xxx passport.use ', username);
    findByUsername(username, function(err, user) {
      if (err) {console.log('xxx err'); return cb(err); }
      if (!user) { console.log('xxx no user'); return cb(null, false); }
      if (user.password != password) { console.log('xxx password mismatch');
	return cb(null, false); }
      console.log('xxx password match')
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  console.log('xxx serializeUser', user);
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  console.log('xxx deserializeUser', id);
  findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// Define routes.

app.get('/', (req, res) => {
  console.log('xxx get root');
  console.log('xxx req.user ', req.user);
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

app.post('/', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    console.log('xxx auth success');
    res.redirect('/');
  });
  
app.get('/logout',
  function(req, res){
    console.log('logout');
    req.logout();
    res.redirect('/');
  });

app.use(express.static('public'))
app.listen(port, () => {
  console.log(`agenda-spa app listening at http://localhost:${port}`)
})
