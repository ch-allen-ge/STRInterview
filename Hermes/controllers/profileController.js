const {
    createTheNewUserProfile,
    getTheFollowers,
    getTheFollowing,
    setTheFollowers,
    setTheFollowing
} = require('../services/profile.service');

const createNewUserProfile = async (username) => {
    try {
        const response = await createTheNewUserProfile(username);
        return response;
    } catch (e) {
        throw e;
    }
}

const getFollowers = async (username) => {
    try {
        const response = await getTheFollowers(username);
        return response;
    } catch (e) {
        throw e;
    }
}

const getFollowing = async (username) => {
    try {
        const response = await getTheFollowing(username);
        return response;
    } catch (e) {
        throw e;
    }
}

const setFollowers = async (username, followers) => {
    try {
        const response = await setTheFollowers(username, followers);
        return response;
    } catch (e) {
        throw e;
    }
}

const setFollowing = async (username, following) => {
    try {
        const response = await setTheFollowing(username, following);
        return response;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createNewUserProfile,
    getFollowers,
    getFollowing,
    setFollowers,
    setFollowing
}