let passport = require('passport');
let User = require('../models/user');

let GithubStrategy = require('passport-github').Strategy;

passport.use(
  new GithubStrategy(
    {
      clientID: 'aaca9b4aaf756d1fbfe1',
      clientSecret: 'bf05b39ee216f2d24da19e12f962536958809980',
      callbackURL: '/auth/github/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      //   console.log(profile);
      let profileData = {
        name: profile.displayName,
        username: profile.username,
        email: profile._json.email,
      };

      User.findOne({ email: profile._json.email }, (error, user) => {
        if (error) {
          return done(error);
        } else {
          if (!user) {
            User.create(profileData, (error, createdUser) => {
              if (error) {
                return done(error);
              } else {
                return done(null, createdUser);
              }
            });
          } else {
            return done(null, user);
          }
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (error, foundUser) => {
    if (error) {
      done(error);
    } else {
      done(null, foundUser);
    }
  });
});
