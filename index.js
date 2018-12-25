const express = require('express');
const passport = require('passport');
const app = express();
const path = require('path');
const session = require('express-session');


// set up view engines
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));


// allow your app to parse urlencoded and json encoded request data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//set up session
app.use(session({
    saveUninitialized: false,
    resave: true,
    secret: 'some-secret'
}));

// initialize passport
app.use(passport.initialize())

// inform passport of the session and tell the app to allow passport manage your sessions;
app.use(passport.session());

// setup your routes
const {
    usersRoute,
    defaultRoute
} = require('./src/routes/index');






//set up any other middleware in here


// set up your routing here
app.get('/', defaultRoute);
app.use('/users', usersRoute);

//setup your fallback route here
app.get('*', (req, res) => {
    res.end('404 Page not found')
})

// start your server
app.listen(process.env.port || 3000, () => {
    console.log(`App listening on port ${process.env.port||3000}`);

})