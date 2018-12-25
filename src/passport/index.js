const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use(LocalStrategy({
    usernameField: email,
    passwordField: password
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