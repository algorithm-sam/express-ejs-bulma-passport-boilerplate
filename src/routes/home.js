const router = require('express').Router();
const User = require('../model/user');
let passport = require('../passport/index');
router.get('/', (req, res) => {
    res.render('index');
})


router.get('/login', (req, res) => {
    if(req.isUnauthenticated()) res.render('login');
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

router.post('/signup', (req, res) => {
    let formData = req.body;

    let user = {
        username: formData.username,
        email: formData.email,
        password: formData.password
    };

    User.create(user)
        .then((user) => {
            req.login(user, (err) => {
                if (err) next(err);
                res.redirect('users/dashboard');
            })
        })
        .catch(err => {
            res.send(err);
        })

})
module.exports = router;