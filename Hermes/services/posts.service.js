const executeQuery = require('../database/db');

const addTheNewPost = async (username, postDetails) => {
    const query = 'insert into posts(username, post_date, source, topic, content) values ($1, $2, $3, $4, $5)';
    const values = [username, ...Object.values(postDetails)];
    return await executeQuery(query, values);
};

const getAllThePosts = async () => {
    const query = 'select * from posts';
    return await executeQuery(query);
}

module.exports = {
    addTheNewPost,
    getAllThePosts
}