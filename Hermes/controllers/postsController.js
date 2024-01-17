const {
    addTheNewPost,
    getAllThePosts,
    deleteThePosts,
    editThePost
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

const editPost = async (post_id, postDetails) => {
    try {
        const response = await editThePost(post_id, postDetails);
        return response;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    addNewPost,
    getAllPosts,
    deletePosts,
    editPost
}