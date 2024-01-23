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

let clients = [];

const sendEventsToAll = async () => {
  const allCurrentPosts = await getAllPosts();
  const sourceFrequency = await getSourceFrequency();

  const combined = {
    allCurrentPosts,
    sourceFrequency
  };

  clients.forEach(client => client.response.write(`data: ${JSON.stringify(combined)}\n\n`))
};

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

    return sendEventsToAll();
  } catch (e) {
    throw e;
  }
});

app.delete('/deletePosts', checkAuthenticated, async (req, res) => {
  try {
    const postsArray = req.body.postsArray;
    await deletePosts(postsArray);

    res.send();

    return sendEventsToAll();
  } catch (e) {
    throw e;
  }
});

app.get('/getAllPostsAndSourceFrequency', checkAuthenticated, async (request, response) => {
  console.log(request);
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);

  const allCurrentPosts = await getAllPosts();
  const sourceFrequency = await getSourceFrequency();
  const combined = {
    allCurrentPosts,
    sourceFrequency
  }
  const data = `data: ${JSON.stringify(combined)}\n\n`;

  response.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response
  };

  clients.push(newClient);

  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
});

app.post('/addPost', checkAuthenticated, async (req, res) => {
  try {
    const username = req.user.username;
    const newPost = {
      post_date: new Date(),
      source: req.body.source,
      topic: req.body.topic,
      content: req.body.content
    }

    await addNewPost(username, newPost);

    return sendEventsToAll();
  } catch (e) {
    throw e;
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});