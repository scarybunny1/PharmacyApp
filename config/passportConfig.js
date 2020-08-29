const mongoose = require('mongoose');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

var User = mongoose.model('user');

passport.use(
    new localStrategy({ usernameField: 'username' },
        (username, password, done) => {
            console.log(password)
            User.findOne({ username: username },
                (err, user)=> {
                    if (err)
                        return done(err);
                    else if (!user)
                        return done(null, false, { message: 'User is not registered.' });
                    else if(!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong Password.' });
                    else
                        return done(null, user);
                });
        })
);
