const {
    addTheNewPost,
    getAllThePosts,
    deleteThePosts
} = require('../services/posts.service');

const addNewPost = async (username, postDetails) => {
    try {
        const response = await addTheNewPost(username, postDetails);
        return response;
    } catch (e) {
        throw e;
    }
}

const getAllPosts = async () => {
    try {
        const response = await getAllThePosts();
        return response;
    } catch (e) {
        throw e;
    }
}

const deletePosts = async(postsArray) => {
    try {
        const response = await deleteThePosts(postsArray);
        return response;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    addNewPost,
    getAllPosts,
    deletePosts
}