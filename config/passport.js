const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = function(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

    User.findOne({ email: email }).then(user => {
      if(!user) {
        return done(null, false, { message: 'The user not registered' });
      }
      
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) {
          console.log(err);
          return;
        }

        if(isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'The user not registered' });
        }
      });
    }).catch(err => console.log(err));
  }));

  passport.serializeUser((user, done) => {
    if (user) return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
      User.findById(id).then(user => {
          if (!user) return done(null, false);
          return done(null, user);        
      });
  });
}