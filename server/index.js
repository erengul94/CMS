'use strict';

const PageDAO = require('./dao/pageDao');
const UserDAO = require('./dao/userDao')

const PORT = 3000;

const defineStatus = require("./utils/util")
const express = require('express');
const dayjs = require('dayjs');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

const app = express();
app.use(morgan('combined'));
app.use(express.json());
// app.use(cors());

// set up and enable cors
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
// app.use(cors(corsOptions));


// Passport: set up local strategy
/* Install strategy to passport library */
passport.use(new LocalStrategy(async function verify(username, password, cb) {
    const user = await new UserDAO().getUser(username, password)
    if (!user)
        return cb(null, false, 'Incorrect username or password.'); // no error, session is not valid

    return cb(null, user); //valid; object user that contains user information
    //(null, false) invalid; invalid credentials login failed
    //(null, false, {message: 'error'});  invalid credentials, login failed with explanation
}));


// store and retreive information from user, user object come from validation, cb function which stores as a cookie 
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

// for retreive, queries the session, extracts the information as an attribute of the request(req.user)
passport.deserializeUser(function (user, cb) { // this user is id + email + name
    return cb(null, user);
    // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
});
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ error: 'Not authorized' });
}
// configure session with middleware
app.use(session({
    secret: "shhhhh... it's a secret!",
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.session());

// install passport to in the api call
app.use(passport.authenticate('session'));


// passwort does everything
app.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(201).json(req.user);
});


// gives the current user in the current session.
app.get('/api/sessions/current', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    }
    else
        res.status(401).json({ error: 'Not authenticated' });
});

app.delete('/api/sessions/current', (req, res) => {
    req.logout(() => {
      res.end();
    });
  });



//// API /////

app.get('/pages', async (req, res) => {
    try {
        const pages = await new PageDAO().getPages('published', "publicationDate");
        res.status(200).send(pages);
    }
    catch {
        res.status(500).send("Error occured while fetching pages")
    }
});


app.get('/page/:id', async (req, res) => {
    const pageID = req.params.id
    try {
        const page = await new PageDAO().getPage(pageID);
        res.status(200).send(page);
    }
    catch {
        res.status(500).send("Error occured while fetching pages")
    }
});


// app.use(isLoggedIn); // I will protects rest of the api calls in the file.

app.post('/createPage', async (req, res) => {
    console.log("create page trriggered")
    try {
        const pageData = req.body
        console.log(pageData)
        const page = await defineStatus(pageData)
        const isCreated = await new PageDAO().createPage(page);
        res.status(201).send(true);
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Error occured while creating page")
    }

});

app.put('/editPage/:id', async (req, res) => {
    try {
        const pageID = req.params.id
        console.log(req.params)
        console.log(pageID)
        console.log("pageID")

        const updatedPage = req.body
        const page = await defineStatus(updatedPage)
        const isUpdated = await new PageDAO().editPage(pageID, page);
        res.status(204).send(isUpdated);
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Error occured while creating page")
    }
});

app.delete('/deletePage/:id', async (req, res) => {
    try {
        const pageID = req.params.id
        const isDeleted = await new PageDAO().deletePage(pageID);
        res.status(200).send(isDeleted);
    }
    catch (err) {
        res.status(500).send("Error occured while creating page")
    }

});


app.get('/getUserPages', async (req, res) => {
    console.log(req)
    try {
        const user = req.user
        // console.log(req.user)
        console.log("req.user")
        console.log(req.user)
        const pages = await new PageDAO().getPagesByUser(user);
        res.status(200).send(pages);
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Error occured while creating page")
    }

});


app.get('/users', async (req, res) => {
    try {
        const users = await new UserDAO().getUsers();
        console.log(users)
        res.status(200).send(users);
    }
    catch {
        res.status(500).send("Error occured while fetching pages")
    }
});


app.listen(PORT,
    () => { console.log(`Server started on http://localhost:${PORT}/`) });