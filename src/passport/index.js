const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');
const User = require('../model/user');
passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (username, password, done) => {

    User.findOne({
            email: username
        })
        .then((user) => {
            if (!user) return done(null, false);
            else {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) return done(null, false);
                    else if (!isMatch) return done(null, false);
                    else return done(null, user);
                })
            }
        })
        .catch(err => {
            return done(err);
        })

}))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})


module.exports = passport;