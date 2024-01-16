const executeQuery = require('../database/db');

const createTheNewUserProfile = async (username) => {
    const query = 'insert into profiles(username, followers, following) values ($1, $2, $3)';
    const values = [username, 0, 0];
    return await executeQuery(query, values);
};

module.exports = {
    createTheNewUserProfile
}