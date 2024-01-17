const executeQuery = require('../database/db');

const createTheNewUserProfile = async (username) => {
    const query = 'insert into profiles(username, followers, following) values ($1, $2, $3)';
    const values = [username, 0, 0];
    return await executeQuery(query, values);
};

const getTheFollowers = async (username) => {
    const query = 'select followers from profiles where username=$1';
    const values = [username];
    return await executeQuery(query, values);
}

const getTheFollowing = async (username) => {
    const query = 'select following from profiles where username=$1';
    const values = [username];
    return await executeQuery(query, values);
}

const setTheFollowers = async (username, followers) => {
    const query = 'update profiles set followers=$2 where username=$1 returning followers';
    const values = [username, followers];
    return await executeQuery(query, values);
}

const setTheFollowing = async (username, following) => {
    const query = 'update profiles set following=$2 where username=$1 returning following';
    const values = [username, following];
    return await executeQuery(query, values);
}

module.exports = {
    createTheNewUserProfile,
    getTheFollowers,
    getTheFollowing,
    setTheFollowers,
    setTheFollowing
}