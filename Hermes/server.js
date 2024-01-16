require('dotenv').config();

const express = require('express');
const passport = require('passport');
const cors = require('cors');
const bcrypt = require("bcrypt");
const { checkNotAuthenticated, checkAuthenticated } = require('./authenticationUtils');
const { registerUser } = require('./controllers/usersController');
const { createNewUserProfile } = require('./controllers/profileController');
const { addNewPost } = require('./controllers/postsController');
const initializePassport = require('./passport-config');
const session = require('express-session');

const app = express();
initializePassport(passport);
const port = process.env.PORT;
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(cors({credentials: true, origin: true}));
app.use(express.json());
app.use(passport.initialize());

app.use(passport.session());

app.post('/register', checkNotAuthenticated, async(req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await registerUser({
      username,
      password: hashedPassword
    });

    await createNewUserProfile(username);

    const user = {
      username,
      password: hashedPassword
    }

    req.login(user, async (err) => {
      if (err) {
        return res.status(500).send('failed to auto log in');
      }
      return res.send();
    });

  } catch (e) {
    throw e;
  }
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

app.post('/logout', checkAuthenticated, (req, res, next) => {
  req.logOut((err) => {
    if (err) { return next(err); }
  });
  res.clearCookie('connect.sid', {
    path: '/'
  }).send();
});

app.post('/addPost', checkAuthenticated, (req, res) => {
  try {
    const username = req.user.username;
    const postDetails = {
      postDate: new Date(),
      source: req.body.source,
      topic: req.body.topic,
      content: req.body.content
    }

    addNewPost(username, postDetails);

    res.send();
  } catch (e) {
    throw e;
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})