const {
    createTheNewUserProfile
} = require('../services/profile.service');

const createNewUserProfile = async (username) => {
    try {
        const response = await createTheNewUserProfile(username);
        return response;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createNewUserProfile
}