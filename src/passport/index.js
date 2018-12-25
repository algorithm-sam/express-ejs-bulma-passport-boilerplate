const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../model/user');
passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (username, password, done) => {
    User.authenticate(username, password)
        .then(user => {
            if (!user) return done(null, false);

            return (null, user)
        })
        .catch(err => {
            return done(err)
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