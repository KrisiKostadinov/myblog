const User = require("../models/User")

const getAllUsers = async () => {
    return await User.find({ $nor: [{ role: 'admin' }] }).lean();
}

module.exports = {
    getAllUsers,
}