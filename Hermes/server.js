require('dotenv').config();

const express = require('express');
const passport = require('passport');
const cors = require('cors');
const bcrypt = require("bcrypt");
const {
  checkNotAuthenticated,
  checkAuthenticated
} = require('./authenticationUtils');
const { registerUser } = require('./controllers/usersController');
const {
  createNewUserProfile,
  getFollowers,
  getFollowing,
  setFollowers,
  setFollowing
} = require('./controllers/profileController');
const {
  addNewPost,
  getAllPosts,
  getSourceFrequency,
  deletePosts,
  editPost
} = require('./controllers/postsController');
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

app.get('/getUsername', checkAuthenticated, async (req, res) => {
  try {
    res.send(req.user.username);
  } catch (e) {
    throw e;
  }
});

app.get('/getAllPosts', checkAuthenticated, async (req, res) => {
  try {
    const response = await getAllPosts();
    res.send(response);
  } catch (e) {
    throw e;
  }
});

app.get('/getFollowers', checkAuthenticated, async (req, res) => {
  try {
    const username = req.user.username;
    const response = await getFollowers(username);
    res.send(response);
  } catch (e) {
    throw e;
  }
});

app.get('/getFollowing', checkAuthenticated, async (req, res) => {
  try {
    const username = req.user.username;
    const response = await getFollowing(username);
    res.send(response);
  } catch (e) {
    throw e;
  }
});

app.get('/getSourceFrequency', checkAuthenticated, async (req, res) => {
  try {
    const response = await getSourceFrequency();
    res.send(response);
  } catch (e) {
    throw e;
  }
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

app.patch('/setFollowers', checkAuthenticated, async (req, res) => {
  try {
    const username = req.user.username;
    const followers = req.body.followers;
    const response = await setFollowers(username, followers);
    res.send(response);
  } catch (e) {
    throw e;
  }
});

app.patch('/setFollowing', checkAuthenticated, async (req, res) => {
  try {
    const username = req.user.username;
    const following = req.body.following;
    const response = await setFollowing(username, following);
    res.send(response);
  } catch (e) {
    throw e;
  }
});

app.patch('/editPost', checkAuthenticated, (req, res) => {
  try {
    const post_id = req.body.post_id;
    const postDetails = {
      source: req.body.source,
      topic: req.body.topic,
      content: req.body.content,
      edited: true
    }

    editPost(post_id, postDetails);

    res.send();
  } catch (e) {
    throw e;
  }
});

app.delete('/deletePosts', checkAuthenticated, async (req, res) => {
  try {
    const postsArray = req.body.postsArray;
    const response = await deletePosts(postsArray);
    res.send(response);
  } catch (e) {
    throw e;
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})