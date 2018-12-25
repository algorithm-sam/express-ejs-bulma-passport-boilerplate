const express = require('express');
const passport = require('./src/passport/index');
const mongoose = require('mongoose');
const app = express();
const helmet = require('helmet');
const path = require('path');
const session = require('express-session');

mongoose.Promise = global.Promise;

// tell express to use helmet
app.use(helmet())

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
app.use('/', defaultRoute);
app.use('/users', usersRoute);

//setup your fallback route here
app.get('*', (req, res) => {
    res.end('404 Page not found')
})

// start your server
mongoose.connect('mongodb://localhost:27017/boilerPlate');
app.listen(process.env.port || 3000, () => {
    console.log(`App listening on port ${process.env.port||3000}`);

})