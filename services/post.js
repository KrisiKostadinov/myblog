const Post = require("../models/Post");

const createPost = async (data) => {
    return await Post.create(data);
}

const getAllPosts = async () => {
    return await Post.find().populate('author').lean().sort({ createdOn: -1 });
}

const getAllPostsByUserId = async (id) => {
    console.log(id);
    return await Post.find({ author: id }).populate('author').lean().sort({ createdOn: -1 });
}

const getPost = async (id) => {
    return await Post.findById(id).lean().populate('author');
}

const deletePost = async (id) => {
    return await Post.findByIdAndDelete(id);
}

const searchPosts = async (query) => {
    return await Post.find({ title: { $regex: query } }).lean().populate('author');
}

module.exports = {
    createPost,
    getAllPosts,
    getPost,
    getAllPostsByUserId,
    deletePost,
    searchPosts,
}