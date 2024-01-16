require('dotenv').config();

const express = require('express');
const passport = require('passport');
const cors = require('cors');
const bcrypt = require("bcrypt");
const { checkNotAuthenticated, checkAuthenticated } = require('./authenticationUtils');
const { registerUser } = require('./controllers/usersController');
const { createNewUserProfile } = require('./controllers/profileController');
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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})