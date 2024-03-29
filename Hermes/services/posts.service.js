const executeQuery = require('../database/db');

const addTheNewPost = async (username, postDetails) => {
    const query = 'insert into posts(username, post_date, source, topic, content) values ($1, $2, $3, $4, $5) returning *';
    const values = [username, ...Object.values(postDetails)];
    return await executeQuery(query, values);
};

const editThePost = async (post_id, postDetails) => {
    const query = 'update posts set source=$2, topic=$3, content=$4, edited=$5 where post_id=$1';
    const values = [post_id, ...Object.values(postDetails)];
    return await executeQuery(query, values);
};

const getAllThePosts = async () => {
    const query = 'select post_id, post_date, source, content, topic, posts.username, edited, followers, following from posts inner join profiles on posts.username = profiles.username';
    return await executeQuery(query);
}

const getTheSourceFrequency = async () => {
    const query = 'select source, count(*) from posts where source = ANY ($1) group by source';
    const values = [['Zeus', 'Poseidon', 'Hades', 'Hercules', 'Kratos', 'Boy']];
    return await executeQuery(query, values);
}

const deleteThePosts = async (postsArray) => {
    const query = 'delete from posts where post_id = ANY ($1)';
    const values = [postsArray];
    return await executeQuery(query, values);
}

module.exports = {
    addTheNewPost,
    getAllThePosts,
    getTheSourceFrequency,
    deleteThePosts,
    editThePost
}