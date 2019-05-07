const router = require('express').Router();

const connection = require('../db/mysql');
let passport = require('../passport/index');
router.get('/', (req, res) => {
    res.render('index');
})


router.get('/login', (req, res) => {
    if (req.isUnauthenticated()) res.render('login');
    else res.redirect('users/dashboard')


})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
}), (req, res, next) => {

    res.redirect('users/dashboard');

})

router.get('/register', (req, res) => {
    if (req.isUnauthenticated()) res.render('signup');
    else res.redirect('users/dashboard');
})

router.post('/signup', (req, res, next) => {
    let formData = req.body;

    var user = {
        username: formData.username,
        email: formData.email,
        password: formData.password
    };

    connection.query("INSERT into users (username,email,password) VALUES (?,?,?)", [user.username, user.email, user.password], (err, response) => {
        if (err) res.send(err);
        else {
            req.login({
                email: user.email,
                password: user.password,
                id: response.insertId
            }, (error) => {
                if (error) next(error);
                res.redirect('users/dashboard');
            })
        }
    })

})

router.get("/logout", (req, res, next) => {
    req.logOut();
    res.redirect("/");
})
module.exports = router;