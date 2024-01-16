import axios from "axios";

const client = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

const strGet = async (url) => {
    try {
        const response = await client.get(url);
        return response;
    } catch (e) {
        throw e;
    }
}

const strPost = async (url, payload) => {
    try {
        const response = await client.post(url, payload);
        return response;
    } catch (e) {
        throw e;
    }
}

const strPatch = async (url, payload) => {
    try {
        const response = await client.patch(url, payload);
        return response;
    } catch (e) {
        throw e;
    }
}

export {
    strGet,
    strPost,
    strPatch
};