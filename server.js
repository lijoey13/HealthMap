const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const routes = require('./routes.js');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt")
const { pool } = require('./database.js');
const { doesNotMatch } = require('assert');

app.use(express.json());
app.use(express.static(__dirname + '/src'));
app.use('/api', routes);

const saltRounds = 10;

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
    function(username, password, cb) {
       pool.query("SELECT * FROM USERS WHERE username=?", [username], function(err, rows) {
            if (err)
                return cb(err);

            if (!rows.length) 
                return cb(null, false);
            /*
            bcrypt.hash(password, saltRounds, function(err, hash) {
                console.log("updating");
                pool.query(`UPDATE USERS SET password="${hash}";`, function(err, row) {
                    console.log(err);
                });
            });
            */

            bcrypt.compare(password, rows[0].password, function(err, result) {
                //if result is false, invalid password
                if (!result)
                    return cb(null, false);

                    
                return cb(null, rows[0]);
            });
        })
    }));
  
  
  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });
  
  passport.deserializeUser(function(id, cb) {
    pool.query("SELECT * FROM USERS WHERE id = ? ", [id], function(err, rows) {
        cb(err, rows[0]);
    });
  });

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/fail' }),
  function(req, res) {
	  res.send(true);
  });

app.get('/fail', function(req, res) {
	res.send(false);
})

app.get('/testing', isLoggedIn, function(req, res) {
    res.send("logged in");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("logged in");
        return next();
    }

    console.log("not logged in");
    res.send("not logged in");
}

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

app.listen(process.env.PORT || '8080', () => console.log('Server is running on port 8080'))

