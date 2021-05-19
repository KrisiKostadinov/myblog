const User = require("../models/User");
const Post = require("../models/Post");

const getAllUsers = async (page) => {
    const users = await User.find().sort({ username: -1 }).skip(2 * page).limit(2).lean();;
    const numberOfDocuments = await User.countDocuments();
    return { users, numberOfDocuments };
}

const getAllPosts = async (page) => {
    const posts = await Post.find().populate('author').sort({ username: -1 }).skip(2 * page).limit(2).lean();;
    const numberOfDocuments = await Post.countDocuments();
    return { posts, numberOfDocuments };
}

module.exports = {
    getAllUsers,
    getAllPosts,
}