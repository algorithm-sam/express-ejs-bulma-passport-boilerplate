const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');
// const User = require('../model/user');
const connection = require('../db/mysql');
passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (username, password, done) => {


    connection.query("SELECT * from users WHERE email = ? LIMIT 1", [username], (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        else {

            // console.log(user[0].password);
            // bcrypt.compare(password, user.password, (err, isMatch) => {
            if (password !== user[0].password) return done(null, false);
            // else if (!isMatch) return done(null, false);
            else return done(null, user[0]);
            // })
        }
    })
    // User.findOne({
    //         email: username
    //     })
    //     .then((user) => {
    //         if (!user) return done(null, false);
    //         else {
    //             bcrypt.compare(password, user.password, (err, isMatch) => {
    //                 if (err) return done(null, false);
    //                 else if (!isMatch) return done(null, false);
    //                 else return done(null, user);
    //             })
    //         }
    //     })
    //     .catch(err => {
    //         return done(err);
    //     })

}))

passport.serializeUser((user, done) => {
    console.log(user.id);
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    connection.query("SELECT * from users WHERE id = ? LIMIT 1", [id], (err, user) => {
        done(err, user)
    })
    // User.findById(id, (err, user) => {
    //     done(err, user)
    // })
})


module.exports = passport;