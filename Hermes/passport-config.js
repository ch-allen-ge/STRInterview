const LocalStrategy = require('passport-local');
const bcrypt = require("bcrypt");
const { getUserPassword, getCurrentUser } = require('./controllers/usersController');

const initializePassport = (passport) => {
    const authenticateUser = async (username, password, done) => {
        const passResponse = await getUserPassword(username);
        const userPassword = passResponse[0].password;
        const user = await getCurrentUser(username);

        if (!user) {
            return done(null, false, { message: 'No user with that username' });
        }

        try {
            if (await bcrypt.compare(password, userPassword)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password Incorrect' });
            }
        } catch (e) {
            return done(e);
        }
    }
    
    passport.use(new LocalStrategy(authenticateUser));

    //this is how im storing the user away
    passport.serializeUser((user, done) => {
        done(null, user.username);
    });
      
    passport.deserializeUser(async (username, done) => {
        const user = await getCurrentUser(username);
        done(null, user);
    });
}

module.exports = initializePassport;