const Post = require("../models/Post");

const createPost = async (data) => {
    return await Post.create(data);
}

const getAllPosts = async () => {
    return await Post.find().populate('author').lean().sort({ createdOn: -1 });
}

module.exports = {
    createPost,
    getAllPosts,
}