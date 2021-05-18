const User = require("../models/User")

const getAllUsers = async (page) => {
    const users = await User.find().sort({ username: -1 }).skip(2 * page).limit(2).lean();;
    const numberOfDocuments = await User.countDocuments();
    return { users, numberOfDocuments };
}

module.exports = {
    getAllUsers,
}