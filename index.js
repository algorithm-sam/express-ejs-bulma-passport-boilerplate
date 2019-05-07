const express = require("express");
const passport = require("./src/passport/index");
const app = express();
const helmet = require("helmet");
// const path = require("path");
const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
var MySQLStore = require('express-mysql-session')(session);

// setup sequelize ORM for use with the project
//setup input validator
//setup error handler
//setup logger to file and to console;





// work on role based authentication 


// import database connection
// let dbConnection = require("./src/db/mongoose");

// tell express to use helmet
app.use(helmet());

// set up view engines
app.set("view engine", "ejs");

app.use(express.static("public"));

// allow your app to parse urlencoded and json encoded request data
const bodyParser = require("body-parser");
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());


var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'events'
};

var sessionStore = new MySQLStore(options);

app.use(session({
    key: 'events-cookie',
    secret: 'somefuckingsecretkeythatshouldnotbeexposed',
    cookie: {
        expires: new Date(Date.now() + 60 * 60 * 1000)
    },
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));



// //set up session
// app.use(
//     session({
//         saveUninitialized: false,
//         resave: false,
//         secret: "some-secret", // migrate this secret and set it in your config or enviromental variables sometime in the future
//         cookie: {
//             expires: new Date(Date.now() + 60 * 60 * 1000)
//         },
//         store: new MongoStore({
//             ttl: 1 * 24 * 60 * 60, // set session to expire in 24hours if requests are not made to the server
//             touchAfter: 60 * 60, //update every one hour
//             mongooseConnection: dbConnection.connection // tell your store to use your db defined in your database file to store your session;
//         })
//     })
// );

// initialize passport
app.use(passport.initialize());

// inform passport of the session and tell the app to allow passport manage your sessions;
app.use(passport.session());


// setup your routes
const {
    usersRoute,
    defaultRoute
} = require("./src/routes/index");

//middleware to pass user obj to the req.locals in the ejs instance.
app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
})

//set up any other middleware in here

// set up your routing here
app.use("/", defaultRoute);
app.use("/users", usersRoute);

//setup your fallback route here
app.get("*", (req, res) => {

    // add a 404 page to handle your 404 errors;
    res.render('error_404')
});

// start your server

app.listen(process.env.port || 9000, () => {
    console.log(`App listening on port ${process.env.port || 9000}`);
});