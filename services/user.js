const User = require("../models/User");
const { sendMail } = require("./sendgrid");

const getUserById = async (id) => {
    return await User.findById(id);
}

const sendVerificationEmail = async (user, secret) => {
    sendMail(user.email,
        'Успешно направена регистрация!',
        'Код за потвърждаване на профила.',
        `<h1>Hello, ${user.username}</h1><p>Последвайте линка  за да потвърдите профила си.</p>
        <a href="http://localhost:2000/users/verification/${user._id}/${secret.code}">http://localhost:2000/users/verification/${user._id}/${secret.code}</a>`);
}

module.exports = {
    getUserById,
    sendVerificationEmail
}