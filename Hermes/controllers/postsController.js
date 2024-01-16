const { addTheNewPost } = require('../services/posts.service');

const addNewPost = async (username, postDetails) => {
    try {
        const response = await addTheNewPost(username, postDetails);
        return response;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    addNewPost
}