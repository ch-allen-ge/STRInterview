const {
    registerNewUser,
    getUserHashedPassword,
    getTheCurrentUserWithoutPassword
} = require('../services/users.service');

const getCurrentUser = async (username) => {
    try {
      const response = await getTheCurrentUserWithoutPassword(username);
      return response[0];
    } catch (e) {
      throw e;
    }
}

const registerUser = async (newUserDetails) => {
    try {
      await registerNewUser(newUserDetails)
    } catch (e) {
      throw e;
    }
}

const getUserPassword = async(username) => {
    try {
      const response = await getUserHashedPassword(username);
      return response;
    } catch (e) {
      throw e;
    }
}

module.exports = {
    registerUser,
    getUserPassword,
    getCurrentUser
}