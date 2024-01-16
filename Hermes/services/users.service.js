const  executeQuery = require('../database/db');

const getTheCurrentUserWithoutPassword = async (username) => {
    const query = 'select user_id, username from users where username=$1';
    const values = [username];
    const resp = await executeQuery(query, values);
    return resp;
}

const getUserHashedPassword = async (username) => {
    const query = 'select password from users where username=$1';
    const values = [username];
    const resp = await executeQuery(query, values);
    return resp;
}

const registerNewUser = async (newUserDetails) => {
    const username = newUserDetails.username;
    const password = newUserDetails.password;

    const query = 'insert into users(username, password) values($1, $2)'
    const values = [username, password];

    try {
        await executeQuery(query, values);
    } catch (e) {
        throw e;
    }
}

module.exports = {
    registerNewUser,
    getUserHashedPassword,
    getTheCurrentUserWithoutPassword
}