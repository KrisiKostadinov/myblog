const Post = require("../models/Post");

const createPost = async (data) => {
    return await Post.create(data);
}

module.exports = {
    createPost,
}